export function getCurStyles(curSetting, setWidth) {
    return {
        width: setWidth ? `${curSetting.width}px` : undefined,
        fontSize: curSetting.fontSize ? `${curSetting.fontSize}px` : "inherit",
        fontWeight: curSetting.isBold ? "bold" : "inherit",
        fontStyle: curSetting.isOblique ? "oblique" : "inherit",
        textAlign: curSetting.textAlign || "inherit"
    }
}