/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('node-fetch')
const app = require('../index')
const userCases = require('./cases/userCases')
const config = require('./config')

chai.use(chaiHttp)
chai.should()

describe('server test', function () {
  this.timeout(10000)

  before(function () {
    chai.request(app)
  })
  // after(async function(){

  // })
  it('should create a user', async () => {
    const resp = await request(`${config.host}/register`, {
      method: 'post',
      body: JSON.stringify(userCases.case_01.input),
      headers: { 'Content-Type': 'application/json' }
    })
    resp.should.have.status(200)
  })
})
