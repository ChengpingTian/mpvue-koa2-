// 新增图书
// 1.获取豆瓣信息
// 2.录入数据库
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const { openid, comment, location, phone, bookid } = ctx.request.body
    try {
        await mysql('comments').insert({ openid, comment, location, phone, bookid })
        console.log(openid, comment, location, phone, bookid)
        ctx.state.data = {
            code: 0,
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '新增失败:' + e.sqlMessage
            }
        }
    }
}
