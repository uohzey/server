import db from "../db/index.js"
function dateFormat(date, fmt) {
    if (null == date || undefined == date) return '';
    var o = {
        "M+": date.getMonth() + 1, //⽉份
        "d+": date.getDate(), //⽇
        "h+": date.getHours(), //⼩时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.toJSON = function () { return dateFormat(this, 'yyyy-MM-dd') }


export function getDataFromAcl(req, res) {
    //定义sql查询语句
    const place = `acl_` + req.body.place
    const sql = `select * from ` + place + ` where date between ? and ? and id%?=0`
    //调用db.query()
    db.query(sql, [req.body.startDate, req.body.endDate, req.body.interval], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        // results.date = dateFormat(results.date)
        res.send({
            data: {
                status: 0,
                message: '读取数据成功!',
                data: results,
            }
        }
        )
    })
}