const assert = require('assert')
const axios = require('axios')
const host = 'http://localhost:8080/user'
const md5 = require('salted-md5')

describe('(Auth) Test request', () => {
    it('(POST) try to login and get the token (with correct info)', (done) => {
        let payload = {
            username:"admin",
            password:md5("123456","admin")
        }
        axios
            .post(`${host}/`, payload)
            .then((res) => {
                console.log('(POST) try to login and get the token:' + res.data.token)
                const val = res.data
                assert(val['token'] !== undefined)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it('(POST) try to login and get the token(with incorrect info)', (done) => {
        let payload = {
            username:"admin",
            password:md5("654321","admin")
        }
        axios
            .post(`${host}/`, payload)
            .then((res) => {
                console.log('(POST) try to login and get the token(with incorrect info):' + res.data.token)
                const val = res.data
                assert(val['token'] === undefined)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
})
