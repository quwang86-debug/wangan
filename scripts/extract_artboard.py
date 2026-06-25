#!/usr/bin/env python3
"""
设计稿画板提取器（网安线上通知书 .sketch）
用法:  python3 extract_artboard.py <画板名> [page.json路径]
默认 page.json: ../../.sketch_tmp/pages/L-whsBzOfsKBwt2zG3wkd.json

输出该画板完整图层树的 1:1 还原所需信息：
  - 绝对坐标 (x,y) 与宽高（相对画板原点）
  - 圆角 (cornerRadius / points 推导)
  - 填充：纯色(hex+alpha) / 渐变(类型+from/to向量+停止点) / 图片(_ref)，
         以及【填充级不透明度】fill.contextSettings.opacity（易漏！）
  - 描边、阴影
  - 文本：字符串 / 字体(去除 "scale;TKSW;" 前缀, 单独报告横向缩放) / 字号 /
         颜色 / paragraphStyle(alignment,min/maxLineHeight,kerning)  ← 注意取 attributes.paragraphStyle
  - 图层级不透明度 / 旋转 / 翻转
关键坑位见 docs/设计稿还原方法论.md
"""
import json, sys, os, math

ALIGN = {0: "left", 1: "right", 2: "center", 3: "justify(两端对齐)", None: "默认(left)"}
FILLTYPE = {0: "纯色", 1: "渐变", 4: "图片", 5: "噪声"}
GRADTYPE = {0: "linear", 1: "radial", 2: "angular"}


def hexc(c):
    r, g, b = round(c["red"] * 255), round(c["green"] * 255), round(c["blue"] * 255)
    a = round(c.get("alpha", 1), 4)
    s = f"#{r:02X}{g:02X}{b:02X}"
    return s if a >= 1 else f"{s} (alpha={a})"


def ctx_opacity(obj):
    cs = (obj or {}).get("contextSettings") or {}
    return cs.get("opacity", 1)


def grad_desc(g):
    t = GRADTYPE.get(g.get("gradientType"), g.get("gradientType"))
    stops = "; ".join(f"{round(s['position'],4)}->{hexc(s['color'])}" for s in g.get("stops", []))
    frm, to = g.get("from"), g.get("to")
    # CSS linear-gradient 角度（忽略宽高比的近似）：from->to 向量
    hint = ""
    try:
        import re
        def pv(v):
            return [float(x) for x in re.findall(r"-?\d*\.?\d+(?:e-?\d+)?", v)]
        fx, fy = pv(frm); tx, ty = pv(to)
        dx, dy = tx - fx, ty - fy
        ang = (math.degrees(math.atan2(dx, -dy))) % 360  # 0deg=向上
        hint = f"  CSS≈linear-gradient({ang:.0f}deg, ...)"
    except Exception:
        pass
    return f"{t} from{frm}->to{to} stops[{stops}]{hint}"


def style_desc(o):
    st = o.get("style") or {}
    parts = []
    for i, fl in enumerate(st.get("fills", []) or []):
        if not fl.get("isEnabled"):
            continue
        op = ctx_opacity(fl)
        optxt = "" if op == 1 else f" 【填充不透明度={op}】"
        ft = fl.get("fillType")
        if ft == 1:
            parts.append(f"渐变填充:{grad_desc(fl.get('gradient',{}))}{optxt}")
        elif ft == 4 and fl.get("image"):
            pft = fl.get("patternFillType")
            parts.append(f"图片填充 ref={fl['image'].get('_ref')} patternType={pft}{optxt}")
        else:
            parts.append(f"纯色填充 {hexc(fl.get('color',{}))}{optxt}")
    for b in st.get("borders", []) or []:
        if b.get("isEnabled"):
            parts.append(f"描边 {hexc(b.get('color',{}))} 宽={b.get('thickness')} 位置={b.get('position')}")
    for sh in st.get("shadows", []) or []:
        if sh.get("isEnabled"):
            parts.append(
                f"阴影 x{sh.get('offsetX')} y{sh.get('offsetY')} blur{sh.get('blurRadius')} spread{sh.get('spread')} {hexc(sh.get('color',{}))}"
            )
    lop = ctx_opacity(st)
    if lop != 1:
        parts.append(f"【图层不透明度={lop}】")
    return "  ".join(parts)


def corner_radius(o):
    if o.get("fixedRadius"):
        return o.get("fixedRadius")
    pts = o.get("points", [])
    radii = sorted({round(p.get("cornerRadius", 0), 2) for p in pts})
    if pts:
        # 角点内缩比例（用于推导圆角矩形半径）
        return f"cornerRadius集={radii}"
    return None


def text_desc(o):
    s = o.get("attributedString", {}).get("string", "")
    out = [f"文本={s!r}"]
    attrs = o.get("attributedString", {}).get("attributes", [])
    seen = set()
    for a in attrs:
        aa = a.get("attributes", {})
        fd = aa.get("MSAttributedStringFontAttribute", {}).get("attributes", {})
        name = fd.get("name", "")
        scale = None
        # js.design 字体名可能形如 "0.905;TKSW;FontName" → 0.905=横向缩放
        if name.count(";") >= 2:
            head = name.split(";")[0]
            try:
                scale = float(head)
            except Exception:
                scale = None
            realname = name.split(";")[-1]
        else:
            realname = name
        col = aa.get("MSAttributedStringColorAttribute", {})
        ps = aa.get("paragraphStyle", {})
        psa = ps.get("attributes", {}) if isinstance(ps, dict) else {}
        key = (realname, fd.get("size"), psa.get("alignment"), psa.get("maximumLineHeight"))
        if key in seen:
            continue
        seen.add(key)
        line = (
            f"  字体={realname} 字号={fd.get('size')} 颜色={hexc(col) if col else '-'} "
            f"对齐={ALIGN.get(psa.get('alignment'), psa.get('alignment'))} "
            f"行高(min/max)={psa.get('minimumLineHeight')}/{psa.get('maximumLineHeight')} "
            f"段距={psa.get('paragraphSpacing')} 字距kerning={aa.get('kerning')}"
        )
        if scale is not None and abs(scale - 1) > 1e-6:
            line += f"  【横向缩放={scale}(仅截断时生效, 一般不应用)】"
        out.append(line)
    out.append(f"  textBehaviour={o.get('textBehaviour')} (0=自动宽,1=定宽自动高,2=定宽高)")
    return "\n".join(out)


def dump(o, depth, indent="  "):
    f = o.get("frame", {})
    cls = o.get("_class")
    name = o.get("name", "")
    head = f"{indent*depth}- [{cls}] {name!r} @({round(f.get('x',0),1)},{round(f.get('y',0),1)}) {round(f.get('width',0),1)}x{round(f.get('height',0),1)}"
    extras = []
    cr = corner_radius(o)
    if cr:
        extras.append(f"圆角={cr}")
    rot = o.get("rotation")
    if rot:
        extras.append(f"旋转={rot}")
    if o.get("isFlippedHorizontal"):
        extras.append("水平翻转")
    if o.get("isFlippedVertical"):
        extras.append("垂直翻转")
    if o.get("hasClippingMask"):
        extras.append("是裁切蒙版")
    if extras:
        head += "  " + " ".join(extras)
    sd = style_desc(o)
    if sd:
        head += "\n" + indent * (depth + 1) + ":: " + sd
    if cls == "text":
        head += "\n" + indent * (depth + 1) + text_desc(o)
    print(head)
    for ch in o.get("layers", []) or []:
        dump(ch, depth + 1, indent)


def main():
    if len(sys.argv) < 2:
        print("用法: python3 extract_artboard.py <画板名> [page.json]")
        sys.exit(1)
    target = sys.argv[1]
    here = os.path.dirname(os.path.abspath(__file__))
    page = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
        here, "..", "..", ".sketch_tmp", "pages", "L-whsBzOfsKBwt2zG3wkd.json"
    )
    d = json.load(open(page, encoding="utf-8"))
    abs_ = [a for a in d["layers"] if a.get("_class") == "artboard" and a.get("name") == target]
    if not abs_:
        names = [a.get("name") for a in d["layers"] if a.get("_class") == "artboard"]
        print(f"未找到画板 {target!r}，可用画板: {names}")
        sys.exit(1)
    ab = abs_[0]
    f = ab["frame"]
    print(f"画板 {target!r}  {f['width']}x{f['height']}  背景:{style_desc(ab) or '(无)'}")
    print("绘制顺序：列表自上而下 = 由底到顶（后者覆盖前者），请按此设 z-index")
    print("=" * 80)
    for ch in ab.get("layers", []):
        dump(ch, 0)


if __name__ == "__main__":
    main()
