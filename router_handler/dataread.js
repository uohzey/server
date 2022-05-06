import db from "../db/index.js"

export function getDataFromAcl(req, res) {
    //定义sql查询语句
    const place = `acl_` + req.body.place
    const sql = `select * from ` + place + ` where date between ? and ? and id%?=0`
    //调用db.query()
    db.query(sql, [req.body.startDate, req.body.endDate, req.body.interval], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send(
            {
                status: 0,
                message: '读取数据成功!',
                data: results,
            }
        )
    })
}