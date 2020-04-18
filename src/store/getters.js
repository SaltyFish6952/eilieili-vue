const getters = {
    // sidebar: state => state.app.sidebar,
    // device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    uid: state => state.user.uid,
    ulv: state => state.user.ulv,
    ulvprogress: state => state.user.ulvprogress,
    lvGap: () => [0, 100, 500, 1000, 2000, 10000, 9999999]
}
export default getters
