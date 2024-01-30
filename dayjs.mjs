'use strict';

import dayjs from 'dayjs';
import vm from 'vm';
import inquirer from 'inquirer';
/* 引入所有 dayjs 的插件 */
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import arraySupport from 'dayjs/plugin/arraySupport.js';
import badMutable from 'dayjs/plugin/badMutable.js';
import bigIntSupport from 'dayjs/plugin/bigIntSupport.js';
import buddhistEra from 'dayjs/plugin/buddhistEra.js';
import calendar from 'dayjs/plugin/calendar.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';
import devHelper from 'dayjs/plugin/devHelper.js';
import duration from 'dayjs/plugin/duration.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isToday from 'dayjs/plugin/isToday.js';
import isTomorrow from 'dayjs/plugin/isTomorrow.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear.js';
import localeData from 'dayjs/plugin/localeData.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import minMax from 'dayjs/plugin/minMax.js';
import OjectSupport from 'dayjs/plugin/objectSupport.js';
import pluralGetSet from 'dayjs/plugin/pluralGetSet.js';
import preParsePostFormat from 'dayjs/plugin/preParsePostFormat.js';
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';
import toArray from 'dayjs/plugin/toArray.js';
import toObject from 'dayjs/plugin/toObject.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import weekYear from 'dayjs/plugin/weekYear.js';
import weekday from 'dayjs/plugin/weekday.js';
import zh from 'dayjs/locale/zh-cn.js';

/* 创建命令行交互 */
function createQEnum(qaEnum, type, defaultVal = 0) {
    const qEunm = [
        {
            type: 'list',
            message: `选择dayjs${type === 1 ? '模块' : '方法'}`,
            name: 'operation',
            default: defaultVal,
            pageSize: 20,
            choices: [],
        },
    ];
    for (const v of qaEnum) {
        qEunm[0].choices.push({
            name: `当前运行 ${v}`,
            value: v,
        });
    }
    return qEunm;
}

const qaEnum = ['时间解析', '取值/赋值', '操作', '显示', '比较', '查询', '国际化', '时长', '退出'];
const qaEnumSecond = [
    [
        'dayjs()',
        'dayjs(new Date())',
        'dayjs(undefined)',
        'dayjs({})',
        'dayjs(null)',
        new inquirer.Separator(),
        `dayjs('2018-04-04T16:00:00.000Z')`,
        `dayjs('2018-04-13 19:18:17.040+02:00')`,
        `dayjs('2018-04-13 19:18')`,
        new inquirer.Separator(),
        `dayjs("12-25-1995", "MM-DD-YYYY")`,
        new inquirer.Separator(),
        `dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-cn')`,
        new inquirer.Separator(),
        `dayjs(1318781876406)`,
        `dayjs.unix(1318781876)`,
        new inquirer.Separator(),
        `dayjs('2022-01-33').isValid()`,
        `dayjs('2018-04-04T16:00:00.000Z').isValid()`,
        new inquirer.Separator(),
        '返回',
    ],
    [
        `dayjs().year()`,
        `dayjs().second(30).valueOf()`,
        `dayjs().millisecond()`,
        `dayjs().millisecond(1)`,
        `dayjs().second()`,
        `dayjs().second(30)`,
        `dayjs().minute()`,
        `dayjs().minute(30)`,
        `dayjs().hour()`,
        `dayjs().hour(6)`,
        `dayjs().date()`,
        `dayjs().date(13)`,
        `dayjs().day()`,
        `dayjs().day(2)`,
        new inquirer.Separator(),
        `dayjs().weekday(0)`,
        `dayjs().weekday(7)`,
        new inquirer.Separator(),
        `dayjs().isoWeekday(1)`,
        `dayjs().isoWeekday(7)`,
        new inquirer.Separator(),
        `dayjs().dayOfYear()`,
        `dayjs().dayOfYear(1)`,
        new inquirer.Separator(),
        `dayjs().week()`,
        `dayjs().week(1)`,
        new inquirer.Separator(),
        `dayjs().isoWeek()`,
        `dayjs().isoWeek(1)`,
        new inquirer.Separator(),
        `dayjs().month()`,
        `dayjs().month(0)`,
        new inquirer.Separator(),
        `dayjs('2010-04-01').quarter()`,
        `dayjs('2010-04-01').quarter(2)`,
        new inquirer.Separator(),
        `dayjs().year()`,
        `dayjs().year(2013)`,
        new inquirer.Separator(),
        `dayjs().weekYear()`,
        `dayjs().weekYear(2013)`,
        new inquirer.Separator(),
        `dayjs().isoWeekYear()`,
        `dayjs().isoWeekYear(2013)`,
        new inquirer.Separator(),
        `dayjs('2004-01-01').isoWeeksInYear()`,
        `dayjs('2005-01-01').isoWeeksInYear()`,
        new inquirer.Separator(),
        `dayjs('2004-01-01').isLeapYear()`,
        `dayjs('2005-01-01').isLeapYear()`,
        new inquirer.Separator(),
        `dayjs().get('year')`,
        `dayjs().get('month')`,
        `dayjs().get('date')`,
        `dayjs().get('day')`,
        `dayjs().get('hour')`,
        `dayjs().get('minute')`,
        `dayjs().get('second')`,
        `dayjs().get('millisecond')`,
        new inquirer.Separator(),
        `dayjs().set('date', 1)`,
        `dayjs().set('month', 3)`,
        `dayjs().set('second', 30)`,
        `dayjs().set('hour', 5).set('minute', 55).set('second', 15)`,
        new inquirer.Separator(),
        `dayjs.max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))`,
        `dayjs.max([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])`,
        new inquirer.Separator(),
        `dayjs.min(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))`,
        `dayjs.min([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])`,
        `返回`,
    ],
    [
        `dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString()`,
        `dayjs().add(1, 'year')`,
        `dayjs().subtract(1, 'year')`,
        `dayjs().startOf('year')`,
        `dayjs().endOf('month')`,
        `dayjs.utc().format()`,
        `dayjs.utc().local()`,
        `dayjs.utc().format()`,
        `dayjs.utc().utc().format()`,
        `返回`,
    ],
    [
        `dayjs().format()`,
        `dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')`,
        `dayjs('2019-01-25').format('DD/MM/YYYY')`,
        `返回`,
    ],
    [
        `dayjs('1999-01-01').fromNow()`,
        `dayjs('1999-01-01').fromNow(true)`,
        new inquirer.Separator(),
        `dayjs('1999-01-01').toNow()`,
        `dayjs('1999-01-01').toNow(true)`,
        new inquirer.Separator(),
        `dayjs().calendar()`,
        `dayjs('1999-01-01').calendar()`,
        new inquirer.Separator(),
        `date1.diff(date2)`,
        `dayjs('2019-01-25').diff(dayjs('2018-01-25'))`,
        `dayjs('2019-01-25').diff(dayjs('2018-01-25'), 'year')`,
        `dayjs('2019-01-25').diff(dayjs('2018-01-25'), 'month', true)`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').valueOf()`,
        `dayjs('2019-01-25').valueOf()+dayjs('2019-01-25')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').unix()`,
        `dayjs.unix(1318781876)`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').daysInMonth()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toDate()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toArray()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toJSON()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toISOString()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toObject()`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').toString()`,
        new inquirer.Separator(),
        `返回`,
    ],
    [
        `dayjs('2019-01-25').isBefore('2019-01-26')`,
        `dayjs().isBefore(dayjs('2019-01-26'), 'month')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isSame('2019-01-26')`,
        `dayjs().isSame(dayjs('2019-01-26'), 'month')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isAfter('2019-01-26')`,
        `dayjs().isAfter(dayjs('2019-01-26'), 'month')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isSameOrBefore('2019-01-26')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isSameOrAfter('2019-01-26')`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isBetween('2019-01-26', '2019-01-27')`,
        `dayjs('2019-01-25').isBetween('2019-01-24', '2019-01-27', 'day')`,
        `dayjs('2019-01-25').isBetween('2019-01-25', '2019-01-27', undefined, '[)')`,
        new inquirer.Separator(),
        `dayjs.isDayjs(dayjs())`,
        `dayjs.isDayjs(new Date())`,
        `dayjs() instanceof dayjs`,
        new inquirer.Separator(),
        `dayjs('2019-01-25').isLeapYear()`,
        new inquirer.Separator(),
        `返回`,
    ],
    [
        `dayjs.locale('zh-cn')`,
        `dayjs.locale()`,
        `dayjs.locale('en').format()`,
        `let locale_de = require('dayjs/locale/de')`,
        `dayjs.locale(locale_de)`,
        `dayjs.extend(localeData)`,
        `dayjs.Weekdays()`,
        `dayjs.WeekdaysShort()`,
        `dayjs.WeekdaysMin()`,
        `dayjs.monthsShort()`,
        `dayjs.months()`,
        `返回`,
    ],
    [
        `dayjs.duration(1000).format()`, // ['PT1S']
        `dayjs.duration(1000).format('h [hours], m [minutes], s [seconds]')`, // ['0 hours, 0 minutes, 1 seconds']
        `dayjs.duration(1, 'seconds').asSeconds()`, // [1]
        `dayjs.duration(1, 'minutes').asSeconds()`, // [60]
        `dayjs.duration(1, 'hours').asSeconds()`, // [3600]
        `dayjs.duration(1, 'seconds').seconds()`, // [1]
        `dayjs.duration(1, 'minutes').seconds()`, // [0]
        `dayjs.duration(1, 'seconds').add(1, 'seconds').seconds()`, // [2],
        `dayjs.isDuration(duration)`, // [true]
        `dayjs.isDuration(dayjs())`, // [false]
        `返回`,
    ],
];
const zhArray = [`dayjs("12-25-1995", "MM-DD-YYYY")`];

// 创建一个函数，用于显示第一级菜单
function showFirstMenu(defaultVal) {
    clearConsole(); // 清除控制台
    const qEunm = createQEnum(qaEnum, 1, defaultVal);
    inquirer
        .prompt(qEunm)
        .then(firstAnswers => {
            if (firstAnswers.operation === '退出') {
                // 如果用户选择退出，退出程序
                console.log('溜了溜了!');
                process.exit();
            } else {
                // 根据第一级选择，显示第二级菜单或执行其他操作
                showSecondMenu(firstAnswers.operation, defaultVal);
            }
        })
        .catch(err => {
            console.log(err);
            showFirstMenu(defaultVal);
        });
}

// 创建一个函数，用于显示第二级菜单
function showSecondMenu(firstChoice, defaultVal) {
    const qEunm = createQEnum(qaEnumSecond[qaEnum.indexOf(firstChoice)], 2, defaultVal);
    inquirer
        .prompt(qEunm)
        .then(secondAnswers => {
            if (secondAnswers.operation === '返回') {
                // 如果用户选择返回上一级，重新显示第一级菜单
                showFirstMenu(firstChoice);
            } else {
                clearConsole(); // 清除控制台
                // 根据第二级选择执行操作，或者继续交互
                console.log(`当前选择: ${firstChoice} - ${secondAnswers.operation}`);
                const { operation } = secondAnswers;

                // 创建一个隔离的上下文，以便执行代码
                const sandbox = {
                    dayjs,
                    console,
                    advancedFormat,
                    arraySupport,
                    badMutable,
                    bigIntSupport,
                    buddhistEra,
                    calendar,
                    customParseFormat,
                    dayOfYear,
                    devHelper,
                    duration,
                    isBetween,
                    isLeapYear,
                    isSameOrAfter,
                    isSameOrBefore,
                    isToday,
                    isTomorrow,
                    isYesterday,
                    isoWeek,
                    isoWeeksInYear,
                    localeData,
                    localizedFormat,
                    minMax,
                    OjectSupport,
                    pluralGetSet,
                    preParsePostFormat,
                    quarterOfYear,
                    relativeTime,
                    timezone,
                    toArray,
                    toObject,
                    updateLocale,
                    utc,
                    weekOfYear,
                    weekYear,
                    weekday,
                    zh,
                    result: null,
                };

                // 在隔离的上下文中执行代码
                vm.createContext(sandbox);
                vm.runInContext(
                    `
                    dayjs.extend(advancedFormat);
                    dayjs.extend(arraySupport);
                    dayjs.extend(badMutable);
                    dayjs.extend(bigIntSupport);
                    dayjs.extend(buddhistEra);
                    dayjs.extend(calendar);
                    dayjs.extend(customParseFormat);
                    dayjs.extend(dayOfYear);
                    dayjs.extend(devHelper);
                    dayjs.extend(duration);
                    dayjs.extend(isBetween);
                    dayjs.extend(isLeapYear);
                    dayjs.extend(isSameOrAfter);
                    dayjs.extend(isSameOrBefore);
                    dayjs.extend(isToday);
                    dayjs.extend(isTomorrow);
                    dayjs.extend(isYesterday);
                    dayjs.extend(isoWeek);
                    dayjs.extend(isoWeeksInYear);
                    dayjs.extend(localeData);
                    dayjs.extend(localizedFormat);
                    dayjs.extend(minMax);
                    dayjs.extend(OjectSupport);
                    dayjs.extend(pluralGetSet);
                    dayjs.extend(preParsePostFormat);
                    dayjs.extend(quarterOfYear);
                    dayjs.extend(relativeTime);
                    dayjs.extend(timezone);
                    dayjs.extend(toArray);
                    dayjs.extend(toObject);
                    dayjs.extend(updateLocale);
                    dayjs.extend(utc);
                    dayjs.extend(weekOfYear);
                    dayjs.extend(weekYear);
                    dayjs.extend(weekday);
                    ${zhArray.includes(operation) ? `dayjs.extend(zh);` : ''}
                    result = ${operation}
                `,
                    sandbox
                );

                // 打印结果
                console.log('操作结果:', sandbox.result ?? '无');
                // 最后，继续循环
                showSecondMenu(firstChoice, operation);
            }
        })
        .catch(err => {
            console.log(err);
            showSecondMenu(firstChoice, defaultVal);
        });
}

// 清除控制台的函数
function clearConsole() {
    // 使用 ANSI 转义码清除控制台
    process.stdout.write('\x1B[2J\x1B[H');
}

// 开始显示第一级菜单
showFirstMenu();
