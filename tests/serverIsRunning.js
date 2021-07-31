/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)
chai.should()

// eslint-disable-next-line no-undef
describe('sarver  test', () => {
  it('should return 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})
