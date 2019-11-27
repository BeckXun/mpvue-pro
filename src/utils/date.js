/**
 * @file 日期处理
 * @module lib/date
 */

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';
const TIME_ZONE = null;

/**
 * 解析时间缀为 UTC 时间缀
 *
 * @param  {number} timestamp 时间缀
 * @return {number}
 */
function parseUTC(timestamp = Date.now()) {
    const date = new Date(timestamp);
    // 偏移的毫秒
    const offset = date.getTimezoneOffset() * 60 * 1000;
    // UTC 时间
    return date.getTime() + offset;
}

/**
 * 解析时区
 *
 * @param {number} [timestamp=Date.now()] 位时间缀
 * @param {number} [timezone=TIME_ZONE] 时区
 * @return {number}
 *
 * @example
 * 1. 使用默认时区
 * parseTimezone(Date.now());
 *
 * 2. 设置中国野区
 * parseTimezone(Date.now(), 8);
 *
 * 3. 设置日本时区
 * parseTimezone(Date.now(), 9);
 */
function parseTimezone(timestamp = Date.now(), timezone = TIME_ZONE) {
    // 如果没有时区则为默认时区
    if (timezone === null) {
        return new Date(timestamp).getTime();
    }

    // UTC 时间
    const utc = parseUTC(timestamp);
    // 目标时区偏移 UTC 的时区
    const target = timezone * 60 * 60 * 1000;

    return utc + target;
}


/**
 * 解析日期为时间缀
 *
 * @param {(Date|string|number)} date 日期字符、时间缀、日期对象
 * @return {number} 13位日期时间缀
 *
 * @example
 * 1. 时间缀
 * parseDate('1536052373064') => 1536052373064
 * parseDate('1536052373') => 1536052373
 * parseDate('-1536052373') => -1536052373
 *
 * 2. 识别时间对象
 * parseDate(new Date()) => 1536052373 => Date.now()
 *
 * 3. 自动修正日期字符串
 * parseDate('2018-01-01') => 1514764800000
 * parseDate('2018/01/01') => 1514764800000
 */
function parseDate(date) {
    try {
        if (!Number.isNaN(date) && (typeof date === 'number' || typeof date === 'string')) {
            date = new Date(parseInt(date, 10));
        } else if (typeof date === 'string') {
            date = new Date(date.replace(/-/g, '/'));
        } else if (date.constructor !== Date) {
            date = new Date();
        }
    } catch (e) {
        date = new Date();
    } finally {
        if (date.toString() === 'Invalid Date') {
            date = new Date();
        }
    }

    return date.getTime();
}

/**
 * 格式化日期，内部调用 parseDate(number) 去转日期
 *
 * @param {(Date|string|number)} number 日期字符、时间缀、日期对象
 * @param {string} [rule=config.dateFormat] 显示格式
 * @param {number} [timezone=TIME_ZONE] 时区
 * @return {string}
 *
 * @description
 * 如果是多位数变量将补0，可枚举的变量有：
 *      Y - 年,
 *      M - 月,
 *      D - 日,
 *      h - 小时,
 *      m - 分钟,
 *      s - 秒,
 *
 * @example
 * 1. 默认转 YYYY-MM-DD
 * formatDate() => '2018-09-04'
 * formatDate(Date.now()) => '2018-09-04'
 * formatDate('2018-09-04') => '2018-09-04'
 *
 * 2. main.js 中安装覆盖默认格式
 * Vue.use(Utils, {
 *      dateFormat: 'DD-MM-YYY',
 * });
 * formatDate('2018-09-04') => '04-09-2018'
 *
 * 3. 透传格式参数
 * formatDate('2018', 'YYYY') => '2018'
 * formatDate('2018-01-01', 'YYYYMM') => '201801'
 * formatDate('2018-01-01', 'YYYY-MM-DD SS') => '201801'
 * formatDate(date, 'YYYY-MM-DD hh:mm:ss') => '2018-01-02 03:04:05'
 * formatDate(date, 'hh:mm:ss YYYY-MM-DD') => '03:04:05 2018-01-02'
 * formatDate(date, 'h:m:s YYYY-M-D') => '3:4:5 2018-1-2'
 *
 * 4. 设置时区
 * formatDate(Date.now(), 'hh:mm:ss', 9);
 * formatDate(Date.now(), 'hh:mm:ss', -9);
 */
function formatDate(number, rule = DATE_FORMAT, timezone = TIME_ZONE) {
    const date = new Date(parseTimezone(parseDate(number), timezone));
    const preprocessor = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        S: date.getMilliseconds(),
    };

    if (/(Y+)/.test(rule)) {
        rule = rule.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }

    Object.keys(preprocessor).forEach((key) => {
        if (new RegExp(`(${key})`).test(rule)) {
            rule = rule.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ?
                    preprocessor[key] :
                    `00${preprocessor[key]}`.substr(String(preprocessor[key]).length),
            );
        }
    });

    return rule;
}

export {
    parseDate,
    formatDate,
    parseTimezone,
    parseUTC,
};
