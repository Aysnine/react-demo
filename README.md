## 初始化 git

```
git init
```

## 添加 `.gitignore`

github：https://github.com/github/gitignore/blob/master/Node.gitignore

vscode插件：.gitignore

Idea插件: .ignore



添加 Node 的 ignore，用 IDEA 的需要再添加 JetBrains 的 ignore，另外由于 parcel 会产生 dist 文件夹，也需要 ignore：`echo dist >> .gitignore`



## 初始化 npm

```
npm init -y
```

## 安装依赖

普通依赖

```
npm install react react-dom less react-router redux react-redux --save
```

开发依赖

```
npm install parcel-bundler babel-preset-react jest less --save-dev
```

babel配置：

```
// package.json
"babel": {
    "presets": [
        "@babel/preset-react"
    ]
}
```

## src

```
// index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="app"></div>
<script src="./src/index.js"></script>
</body>
</html>
```

```
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
    <div>hello</div>
);

ReactDOM.render(<App />, document.getElementById('app'));
```

## 配置 start 启动

```
// package.json

"script": {
		"start": "parcel index.html"
}
```

启动 devServer：

`npm start`，端口默认 1234

##  组件 render 渲染技巧

```
class Hello extends Component {
    render() {
        // 准备 local 变量
        const { greeting } = this.props;

        // -----

        // 直接使用 local 变量
        return (
            <div>
                { greeting }
            </div>
        );
    }
}
```

## class 组件无法使用箭头函数？

需要添加babel插件：

```
// package.json

  "babel": {
    "presets": [
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ]
  },
```

重启 parcel，会自动安装这个插件

## 后端没有开启跨域，可以给parcel加装代理服务


在项目下添加文件 `scripts/server.js`

```
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
```

添加依赖 `npm install http-proxy-middleware express --save-dev`

把 `package.json` 里的 start 改一下：

```
"scripts": {
	"start": "node scripts/server.js"
}
```

现在前端发异步请求只需要 `fetch('/api/user/xxx')`，请求就会转发给 `http://localhost:8080/api/user/xxx`，后端也不需要设置跨域。

