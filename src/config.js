
export const STORAGE_KEY = 'H5LOG_LOCALSTORAGE_KEY'
export const LEVELS = ['debug', 'info', 'warn', 'error', 'all']
export const ALL_LEV = 4

// 低于该级别的日志不会被记录
export let THRESHOLD_LEV = -1
// 日志最大限制1M
export let MAX_SIZE = 1 * 1024 * 1024

/**
 * 设置阀值  低于阀值的级别不会被记录
 * @param {number | string} v [日志级别]
 *
 */
export function setThreshold(v) {
    THRESHOLD_LEV = isNaN(v) ? LEVELS.indexOf(v) : parseInt(v)
}

/**
 * 设置日志最大字节数
 * @param {number} v 最大值
 *
 */
export function setMaxSize(v) {
    if (!isNaN(v)) {
        MAX_SIZE = Number(v)
    }
}
