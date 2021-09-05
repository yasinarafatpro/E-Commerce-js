/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
const joiErrorFormatter = (newError) => {
  const errors = {}
  const detail = newError.details
  detail.map(d => {
    errors[d.path] = [d.message]
  })
  return errors
}
const mongoseErroeFormatter = (mongError) => {
  const errors = {}
  const detail = mongError.errors
  for (const key in detail) {
    errors[key] = [detail[key].message]
  }
  return errors
}
module.exports = { mongoseErroeFormatter, joiErrorFormatter }
