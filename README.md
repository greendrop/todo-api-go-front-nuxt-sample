# todo-api-go-front-nuxt-sample

GO言語を使用したAPI( https://github.com/greendrop/todo-api-go-sample )のフロントサンプルです。

## 使用言語・ライブラリ

- Vue.js
- Nuxt.js

## 環境構築アプリケーション

- Docker
- Docker Compose
- direnv
- git

## セットアップ

```shell
$ git clone git@github.com:greendrop/todo-api-go-front-nuxt-sample.git
$ cd todo-api-go-front-nuxt-sample
$ vi .envrc
$ direnv allow
$ docker-compose pull
$ docker-compose build
$ docker-compose run --rm front bash
$ yarn install
$ exit
$ docker-compose up
```

### .envrc

```
export USER_ID=`id -u`
export GROUP_ID=`id -g`
```