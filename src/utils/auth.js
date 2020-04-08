const tokenKey = "EiliEili_Token";
const userKey = "EiliEili_User";

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function setToken(token) {
    return localStorage.setItem(tokenKey, token)
}

export function removeToken() {
    return localStorage.removeItem(tokenKey)
}

export function getUser() {
    return localStorage.getItem(userKey)
}

export function setUser(user) {
    return localStorage.setItem(userKey, JSON.stringify(user))
}

export function removeUser() {
    return localStorage.removeItem(userKey)
}
