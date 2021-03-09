import { post } from '../util/request'

export function loginApi(user) {
    return post('/user/login',user)
}
