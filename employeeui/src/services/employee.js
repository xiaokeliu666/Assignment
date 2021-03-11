import { get, post, put, del } from '../util/request'

export function listApi(curPage = 1, pageSize = 5) {
    return get(`/employee/${curPage}/${pageSize}`)
}

export function addApi(data) {
    return post("/employee/",data)
}

export function updateApi(id,data) {
    return put(`/employee/${id}`,data);
}

export function delApi(id) {
    return del(`/employee/${id}`)
}

export function findByInfoApi(curPage,pageSize,data) {
    return post(`/employee/${curPage}/${pageSize}`,data)
}

