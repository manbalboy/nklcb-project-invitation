const express = require('express');
const logger = require('morgan');

class App {
    constructor () {
        this.app = express();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();


    }


    setMiddleWare (){
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setStatic (){
        this.app.use('/uploads', express.static('static'));
    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).send('400 에러')
        });
    }

    errorHandler() {
        this.app.use( (err, req, res,  _ ) => {
            res.status(500).send('500 에러')
        });
    }

}

module.exports = new App().app;