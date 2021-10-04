/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('node-fetch')
const app = require('../index')
// eslint-disable-next-line no-unused-vars
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
  it('should log a user', async () => {
    const resp = await request(`${config.host}/login`, {
      method: 'post',
      body: JSON.stringify({
        email: 'a@gmail.com',
        password: '1234'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    resp.should.have.status(200)
  })
  it('Not log a user', async () => {
    const resp = await request(`${config.host}/login`, {
      method: 'post',
      body: JSON.stringify({
        email: 'abc@gmail.com',
        password: '1234'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    resp.should.have.status(200)
  })
})
