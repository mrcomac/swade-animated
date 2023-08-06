

export async function set_token_size(scCopy, scSize) {
    debug("Set Token Size")
    if (scSize <= 2 && scSize >= 0) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 1 })
    } else if (scSize <= 5 && scSize >= 3) {
        await scCopy.document.update({ "height": 2, "width": 2, "scale": 1 })
    } else if (scSize <= 8 && scSize >= 6) {
        await scCopy.document.update({ "height": 4, "width": 4, "scale": 1 })
    } else if (scSize <= 11 && scSize >= 9) {
        await scCopy.document.update({ "height": 8, "width": 8, "scale": 1 })
    } else if (scSize > 11) {
        await scCopy.document.update({ "height": 16, "width": 16, "scale": 1 })
    } else if (scSize === -1) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.85 })
    } else if (scSize === -2) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.75 })
    } else if (scSize === -3) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.6 })
    } else if (scSize <= -4) {
        await scCopy.document.update({ "height": 1, "width": 1, "scale": 0.5 })
    }
}