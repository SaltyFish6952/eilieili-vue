import {sectors} from "./data";
// const sectors = [
//     {
//         sectorId: 1,
//         sectorName: "哈皮区"
//     }, {
//         sectorId: 2,
//         sectorName: "尼玛区"
//     }]


export default [

    {
        url: '/sector',
        type: 'get',
        // eslint-disable-next-line no-unused-vars
        response: (req, res) => {

            if (req.query.sectorId === undefined || req.query.sectorId === null) {
                return {
                    msg: "操作成功",
                    code: 0,
                    data: {
                        sectors: sectors

                    }
                }
            } else {
                const {sectorId} = req.query;
                for (let i = 0; i < sectors.length; i++) {

                    if (sectorId === sectors[i].sectorId) {
                        return {
                            msg: "操作成功",
                            code: 0,
                            data: {
                                sector: sectors[i]

                            }
                        }
                    }

                }

            }


        }
    }

]