import {rankings} from './data'

function getRankings(sectorId) {
    let arr = [];
    for (let i = 0; i < rankings.length; i++) {
        if (rankings[i].sectorId === sectorId) {
            arr.push(rankings[i])
        }
    }
    return arr;
}


export default [
    {
        url: '/ranking',
        type: 'get',
        // eslint-disable-next-line no-unused-vars
        response: (req, res) => {
            window.console.log(req)

            if (req.query.sectorId != null) {
                const {sectorId} = req.query

                return {
                    msg: "操作成功",
                    code: 0,
                    data: {
                        videos: getRankings(sectorId)
                    }
                }
            } else {
                return {
                    msg: "操作成功",
                    code: 0,
                    data: {
                        videos: rankings

                    }
                }
            }


        }
    }
]