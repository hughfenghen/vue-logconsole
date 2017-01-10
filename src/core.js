/**
 * web前端日志核心
 * 提供日志记录、查询、订阅
 * 使用浏览器localStorage做持久化，默认占用1M空间，超过时清除较旧的日志记录
 */
import {
    STORAGE_KEY,
    LEVELS,
    ALL_LEV,
    THRESHOLD_LEV,
    MAX_SIZE
} from './config'
import {
    LogEntity
} from './log-entity'

// 日志变化订阅者
const SUBSCRIBERS = []

// 日志容器
let POOL = []
let CURRENT_SIZE = 0

/**
 * 记录日志
 * @param  {number} lev     日志级别
 * @param  {object} tag     日志标签
 * @param  {object} content 日志内容
 */
function log(lev, tag, content) {
    // 级别不够 或参数为空
    if (lev < THRESHOLD_LEV || !tag) {
        return
    }

    // 异步记录日志
    setTimeout(function() {
        save(lev, tag, content || '')
    }, 1)
}

let updateStorage = debounce((dataStr) => {
    localStorage[STORAGE_KEY] = dataStr
}, 500)

/**
 * 防反跳 避免性能损耗
 * @param  {number} idle   延迟多长时间执行
 * @param  {function} action 延迟执行的函数
 */
function debounce(action, idle) {
    let last
    return function() {
        clearTimeout(last)
        let args = arguments
        last = setTimeout(() => {
            action(...args)
        }, idle)
    }
}

/**
 * 存储符合条件的日志
 * @param  {number} lev     级别
 * @param  {object} tag     标记
 * @param  {object} content 内容
 *
 */
function save(lev, tag, content) {
    let entity = new LogEntity(lev, tag, content, Date.now())
        // 剩余可存储字节数
    let diffValue = MAX_SIZE - CURRENT_SIZE - entity.bytesSize
    let tmp

    // 保证日志字节数小于限制
    while (diffValue < 0 && POOL.length) {
        tmp = POOL.pop()

        diffValue += tmp.bytesSize
        CURRENT_SIZE -= tmp.bytesSize
    }
    // 最后一个对象字节数大于限制
    if (diffValue < 0) {
        return
    }

    // update CURRENT_SIZE
    CURRENT_SIZE += entity.bytesSize
    // save memory
    POOL.unshift(entity)
    // publish
    SUBSCRIBERS.forEach(function(it) {
        it(entity)
    })
    // save cache
    updateStorage(JSON.stringify(POOL))
}

/**
 * 读取日志
 * @param  {int | string}   lev     日志级别 6：所有级别，级别不做过滤条件
 * @param  {string}         keyword 关键字 过滤出tag、content中含关键字的日志
 * @return {array}                  过滤后的数组
 */
function readLog(lev, keyword) {
    let l
        // 忽略大小写
    let reg = new RegExp(keyword || '', 'i')

    if (lev === undefined) {
        // return copy
        return POOL.slice(0)
    }

    if (isNaN(lev)) {
        l = LEVELS.indexOf(lev)
    } else {
        l = parseInt(lev)
    }

    return POOL.filter(function(it) {
        // 按lev、tag、content过滤  级别为6忽略
        return (l === ALL_LEV || l === it.lev) && (~it.tag.search(reg) || ~it.content.search(reg))
    })
}

function debug(tag, content) {
    log(0, tag, content)
}

function info(tag, content) {
    log(1, tag, content)
}

function warn(tag, content) {
    log(2, tag, content)
}

function error(tag, content) {
    log(3, tag, content)
}

function getCurrentSize() {
    return CURRENT_SIZE
}

/**
 * 提供新增日志订阅
 * @param  {Function} fn 回调
 */
function subscribe(fn) {
    if (typeof fn === 'function') {
        SUBSCRIBERS.push(fn)
    }
}

function initialize() {
    if (POOL.length) return
    let logStr = localStorage[STORAGE_KEY]
    if (logStr) {
        try {
            POOL = JSON.parse(logStr)
            POOL.forEach(function(it) {
                CURRENT_SIZE += it.bytesSize
            })
        } catch (e) {
            error('log-console init', '读取日志失败！日志已被重置。\n' + e.stack)
        }
    } else {
        localStorage[STORAGE_KEY] = '[]'
    }
}

export default {
    // 插入一条debug级别日志
    debug,
    info,
    warn,
    error,
    // 读取日志 按关键字筛选
    readLog,
    // 日志变化订阅
    subscribe,
    // 日志当前占用localStorage字节数
    getCurrentSize,
    initialize
}
