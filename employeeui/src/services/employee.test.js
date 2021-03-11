const assert = require('assert')
const axios = require('axios')
const host = 'http://localhost:8080/employee'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTYwMjI0MTEsInVzZXJuYW1lIjoiYWRtaW4ifQ.Wt9M1c_CtkuPb9nSu11XHXm7lUu_BTDq3pTMVdR2awE'

describe('Test request', () => {
    it('(GET) the record of first pages(with token)', (done) => {
        let config = {
            headers: { token: `${token}`},
        }
        axios
            .get(`${host}/1/5`, config)
            .then((res) => {
                console.log('(GET) the record of first pages(with token): ' + res.data.msg)
                const val = res.data
                if (val['status'] === true) {
                    assert(val['status'] === true)
                }
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it('(GET) the record of first pages(without token)', (done) => {
        axios
            .get(`${host}/1/5`)
            .then((res) => {
                console.log('(GET) the record of first pages(without token): ' + res.data.msg)
                const val = res.data
                assert(val['msg'] === 'Token Exception')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it('(DELETE) a non-existence the record (with token)', (done) => {
        let config = {
            headers: { token: `${token}`},
        }
        axios
            .delete(`${host}/IT999`,config)
            .then((res) => {
                console.log('(DELETE) a non-existence the record (with token): ' + res.data.msg)
                const val = res.data
                assert(val['msg'] === 'Invalid Employee!')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it('(POST) a new record with an existing id (with token)', (done) => {
        let config = {
            headers: { token: `${token}`},
        }
        let payload = {
            id: "IT001",
            name: "Jane",
            surname: "Green",
            address: "63 Bank Street",
            phone: "8732819321",
            title: "tester"
        }
        axios
            .post(`${host}/`,payload,config)
            .then((res) => {
                console.log('(POST) add a new record with an existing id (with token): ' + res.data.msg)
                const val = res.data
                assert(val['msg'] === 'Id existed')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    it('(PUT) update a record with (with token): ', (done) => {
        let config = {
            headers: { token: `${token}`},
        }
        let payload = {
            name: "Xiaoke",
            surname: "Liu",
            address: "255 Wilbrod Street",
            phone: "8732880212",
            title: "Developer"
        }
        axios
            .put(`${host}/IT001`,payload,config)
            .then((res) => {
                console.log('(PUT) update a record with (with token): ' + res.data.msg)
                const val = res.data
                assert(val['msg'] === 'IT001 updated!')
                done()
            })
            .catch((err) => {
                done(err)
            })
    });
})
