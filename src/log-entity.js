
/**
 * 按UTF-8编码计算字符串所占字节数
 * @param  {string} s 需要计算的字符日
 * @return {number}   字符串所占字节数
 */
function getStrBtSize(s) {
    let totalLength = 0
    let i
    let charCode
    for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i)
        if (charCode < 0x007f) {
            totalLength += 1
        } else if (charCode >= 0x0080 && charCode <= 0x07ff) {
            totalLength += 2
        } else if (charCode >= 0x0800 && charCode <= 0xffff) {
            totalLength += 3
        }
    }
    return totalLength
}

/**
 * 日志对象
 * @param {number | string} lev     级别
 * @param {object} tag     标记
 * @param {object} content 内容
 * @param {number} time    时间戳
 *
 */
export class LogEntity {
    lev
    tag
    content
    time
    bytesSize = 0

    constructor(lev, tag, content, time) {
        this.lev = lev
        this.tag = typeof tag === 'string' ? tag : JSON.stringify(tag)
        this.content = typeof content === 'string' ? content : JSON.stringify(content)
        this.time = time

        // 计算中英文混合字节数
        // 81为转json后多出的字符数
        let bs = getStrBtSize(this.tag) + getStrBtSize(this.content) + 65
        this.bytesSize = bs + bs.toString().length
    }
}
