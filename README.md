# daocloud-plus

[![Build Status](https://api.travis-ci.org/lijy91/daocloud-plus.svg?branch=master)](https://travis-ci.org/lijy91/daocloud-plus)

> 一个迷你的 [DaoCloud](https://daocloud.io) 托盘控制台程序，基于
 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 脚手架创建。

## 截图

![](https://oeolgl6y5.qnssl.com/article/rJUVHZHDl/Hku8SZrve.png?imageView2/2/w/480/h/480)

## 项目依赖
- [electron](https://github.com/electron/electron)
- [vue.js](https://github.com/vuejs/vue)
- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [vue-resource](https://github.com/pagekit/vue-resource)
- [dotenv](https://github.com/motdotla/dotenv)
- [menubar](https://github.com/maxogden/menubar)
- [shortid](https://github.com/dylang/shortid)

## 快速开始

### 克隆源码

```
$ git clone https://github.com/lijy91/daocloud-plus.git
$ cd daocloud-plus
```

### 安装依赖

```
$ npm install
```

### 配置环境变量

1、 创建 `.env` 环境变量配置文件

```
$ cp app/.env.example app/.env
```

2、 编辑 `.env` 文件，修改相关配置

```
YUNBA_APP_KEY=<Your AppKey>
YUNBA_SECRET_KEY=<Your Secret Key>
```

### Mas包签名
```
$ find . -type f -exec chmod 0644 {} \;
$ electron-osx-sign path/to/my.app --provisioning-profile=path/to/my.provisionprofile --entitlements=path/to/my.entitlements --entitlements-inherit=path/to/my.entitlements
$ electron-osx-flat path/to/my.app
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## 许可证

    Copyright (C) 2016 JianyingLi <lijy91@foxmail.com>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
