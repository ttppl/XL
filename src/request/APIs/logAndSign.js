import request from '../request'

function login (params) {
  return request.post('/login', params)
}

export default { login }
