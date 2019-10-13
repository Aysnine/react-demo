// scripts/server.js
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('index.html')
let app = express()

app.use(
  '/api', // 需要代理的根路径
  proxy({
    target: 'http://localhost:8080' // 后端地址
  })
)

app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))