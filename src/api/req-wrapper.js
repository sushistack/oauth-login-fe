import axios from 'axios'
import store from '../store/index'
import handler from './res-handler'

const URI_PREPENDER = '/api/v1'
const wrap = (url) => `${URI_PREPENDER}${url}`
const appendAuth = (config) => {
  const token = store.getters.token
  if (token) {
    if (!config) config = { headers: {} }
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}

export default {
  get (url, success, fail = err => err.response.data.message, config) {
    axios.get(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  post (url, body, success, fail = err => err.response.data.message, config) {
    axios.post(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  put (url, body, success, fail = err => err.response.data.message, config) {
    axios.put(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  upload (url, body, progress, success, fail) {
    var formData = new FormData()
    if (body.constructor === Object) {
      for (let key in body) {
        formData.append(key, body[key])
      }
    } else if (body.constructor === Array) {
      body.forEach(b => formData.append(b[0], b[1]))
    } else {
      console.error('unkown type')
    }
    axios.post(wrap(url), formData, {
      headers: {
        'Content-Type': 'multipart/formdata; charset=utf-8',
        'Accept': '*/*'
      },
      onUploadProgress: e => { progress(e.loaded) }
    })
      .then(handler.handle(success))
      .catch(fail)
  },
  delete (url, success, fail = err => err.response.data.message, config) {
    axios.delete(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  }
}
