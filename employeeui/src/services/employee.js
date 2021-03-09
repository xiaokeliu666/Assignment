import { get, post, put, del } from '../util/request'

export function listApi(curPage = 1, pageSize = 5) {
    return get(`/employee/list/${curPage}/${pageSize}`)
}

export function addApi(data) {
    return post("/employee/add",data)
}

export function updateApi(id,data) {
    return put(`/employee/update/${id}`,data);
}

export function delApi(id) {
    return del(`/employee/delete/${id}`)
}

export function findByInfoApi(curPage,pageSize,data) {
    return post(`/employee/findBy/${curPage}/${pageSize}`,data)
}

