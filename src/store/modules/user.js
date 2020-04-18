// import {login, logout, getInfo} from '@/api/user'
import {getUserInfo, login} from '@/api/user'

import {getToken, setToken, removeToken, getUser, setUser, removeUser} from '@/utils/auth'
import {Encrypt} from '@/utils/crypto'
// import { resetRouter } from '@/router'


const getDefaultState = () => {

    const user = JSON.parse(getUser());
    if (user != null) {
        return {
            token: getToken(),
            name: user.userName,
            avatar: user.userPicPath,
            uid: user.userId,
            ulv: user.userLevel,
            ulvprogress: user.userLevelProgress
        }
    } else {
        return {
            token: '',
            name: '',
            avatar: '',
            uid: '',
            ulv: '',
            ulvprogress: ''
        }
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ULV: (state, ulv) => {
        state.ulv = ulv
    },
    SET_ULVPROGRESS: (state, ulvprogress) => {
        state.ulvprogress = ulvprogress
    },
    SET_UID: (state, uid) => {
        state.uid = uid
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {userAccount, password} = userInfo
        return new Promise((resolve, reject) => {

            window.console.log(userAccount, Encrypt(password))

            login({"userAccount": userAccount, "password": Encrypt(password)}).then(response => {
                window.console.log(response);


                if (response.code === 0) {
                    const {data} = response;
                    commit('SET_TOKEN', data.token);
                    commit('SET_ULV', data.user.userLevel);
                    commit('SET_ULVPROGRESS', data.user.userLevelProgress);
                    commit('SET_UID', data.user.userId);
                    commit('SET_NAME', data.user.userName);
                    commit('SET_AVATAR', data.user.userPicPath)
                    setToken(data.token)
                    setUser(data.user)
                }

                resolve(response.code)


            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getUserInfo({userId: state.uid}).then(response => {

                window.console.log(response)

                const {user} = response.data

                if (!user) {
                    reject('Verification failed, please Login again.')
                }
                commit('SET_ULV', user.userLevel);
                commit('SET_ULVPROGRESS', user.userLevelProgress);
                commit('SET_UID', user.userId);
                commit('SET_NAME', user.userName);
                commit('SET_AVATAR', user.userPicPath)
                setUser(user)

                resolve(user)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    // eslint-disable-next-line no-unused-vars
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            //     removeToken() // must remove  token  first
            //     // resetRouter()
            //     commit('RESET_STATE')
            //     resolve(0)
            // }).catch(error => {
            //     reject(error)
            // })

            try {
                removeToken(); // must remove  token  first
                removeUser();
                // resetRouter()
                commit('RESET_STATE')
                resolve(0)
            } catch (error) {
                reject(error)
            }
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

