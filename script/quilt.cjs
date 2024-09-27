const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const axios = require('axios')
require('dotenv').config({ path: '.env.test' })
const api = process.env.VITE_APP_BASE_API
const buildUrl = process.env.VITE_BUILD_URL
const client_id = 'WxGWIXX-0n4R37UD8Q0zQyMuSHilmTAaPLxZgZ2hZY'
const client_secret = 'v4kbjm7G84WmCNiPHzXWylacdn3XrdBY0YLWgLKwM9W'
const data = {
  client_id,
  client_secret,
  grant_type: '22',
}
const reqComment = () => axios.post(`${api}/oauth/token.json`, data)
const getType = () => axios.get(`${api}/oauth/applications/22.json`)
getType()
  .then((data) => {
    console.log(data.data)
  })
  .catch((error) => {
    console.error(error)
  })
// reqComment().then((data) => {
//   console.log(data.data);
// }).catch((error) => {
//   console.error('Promise rejected with error:', error);
// });
