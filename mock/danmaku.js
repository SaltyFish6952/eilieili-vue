import Mock from 'mockjs'




const danmaku = [
    ['5', 2, '#ff000b', 'heh', '我是5秒'],
    ['10', 1, '#FFFFFF', 'heh', '我是10秒'],
    ['15', 3, '#FFFFFF', 'heh', '我是15秒']
];

const length = Mock.Random.natural(100, 999);

for (let i = 0; i < length; i++) {
    danmaku.push([
        Mock.Random.natural(0, 200).toString(),
        Mock.Random.natural(0,2),
        Mock.Random.color(),
        'hhh',
        Mock.Random.word(10, 30)
    ])
}

export default [
    {
        url: '/danmaku/v3',
        type: 'get',
        // eslint-disable-next-line no-unused-vars
        response: (req, res) => {

            window.console.log('danmaku', req, res, danmaku)

            return {
                msg: "操作成功",
                code: 0,
                data: danmaku
            }
        }
    }
]