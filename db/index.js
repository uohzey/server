import mysql from 'mysql'

//创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'jk518858',
    database: 'camoc',
})

export default db