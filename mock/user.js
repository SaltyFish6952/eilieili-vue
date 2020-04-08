// const tokens = {
//     admin: {
//         token: 'admin-token'
//     },
//     editor: {
//         token: 'editor-token'
//     }
// }
//
// const users = {
//     'admin-token': {
//         roles: ['admin'],
//         introduction: 'I am a super administrator',
//         avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//         name: 'Super Admin'
//     },
//     'editor-token': {
//         roles: ['editor'],
//         introduction: 'I am an editor',
//         avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//         name: 'Normal Editor'
//     }
// }

import Mock from 'mockjs'
import {users} from "./data";

const user = {
    userId: '123',
    userName: "admin",
    userLevelProgress: "1000"
};

const token = Mock.Random.word(100);

function getUser(userId) {

    for (let i = 0; i < users.length; i++) {

        if (users[i].userId === userId) {
            return users[i]
        }

    }

}


export default [
    // user login
    {
        url: '/login',
        type: 'post',

        // eslint-disable-next-line no-unused-vars
        response: (req, res) => {
            // const {userAccount} = req.body
            // const token = tokens[userAccount]
            // window.console.log(req, res)
            // window.console.log(token)
            // // mock error
            // if (!token) {
            //     return {
            //         code: 60204,
            //         message: 'Account and password are incorrect.'
            //     }
            // }
            //
            // return {
            //     code: 200,
            //     data: token
            // }
            window.console.log(req)
            if (req.body.userAccount === '111' && req.body.password === "F84ez8SPSmJFYp+EHTOx8g==") {
                return {
                    "code": 0,
                    "message": "操作成功",
                    "data": {
                        "user": user,
                        "token": token
                    }
                }
            } else {
                return {
                    "code": 404,
                    "message": "用户名或密码错误",
                    "data": null
                }
            }


        }
    },

    // get user info
    {
        url: '/user',
        type: 'get',
        response: res => {
            // const {token} = config.query
            // const info = users[token]
            //
            // // mock error
            // if (!info) {
            //     return {
            //         code: 50008,
            //         message: 'Login failed, unable to get user details.'
            //     }
            // }
            // window.console.log(token)

            const {userId} = res.query;

            return {
                code: 20000,
                data: {
                    user: getUser(userId)
                }
            }
        }
    },

    // user logout
    {
        url: '/vue-admin-template/user/logout',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]
