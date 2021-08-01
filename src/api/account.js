import req from './req-wrapper'

const ACCOUNT_URI = {
  LOGIN: '/auth/login',
  USER: '/users'
}

export default {
  login (body, success, fail) {
    req.post(ACCOUNT_URI.LOGIN, body, success, fail)
  },
  getUser (success) {
    req.get(ACCOUNT_URI.USER, success)
  }
}
