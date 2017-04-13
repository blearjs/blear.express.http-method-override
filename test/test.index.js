/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2017年04月13日17:26:43
 */


'use strict';

var expect = require('chai-jasmine').expect;
var httpMethodOverride = require('../src/index.js');
var express = require('express');
var request = require('supertest');

describe('测试文件', function () {
    it('override', function (done) {
        var app = express();

        app.use(httpMethodOverride());
        app.post('/', function (req, res, next) {
            res.send('post');
        });
        app.delete('/', function (req, res, next) {
            res.send('delete');
        });

        request(app)
            .post('/')
            .set('x-HTTP-method-override', 'DELETE')
            .expect(200)
            .end(function (err, res) {
                expect(!!err).toBe(false);
                expect(res.text).toBe('delete');

                done();
            });
    });

    it('original', function (done) {
        var app = express();

        app.post('/', function (req, res, next) {
            res.send('post');
        });
        app.delete('/', function (req, res, next) {
            res.send('delete');
        });

        request(app)
            .post('/')
            .set('x-HTTP-method-override', 'DELETE')
            .expect(200)
            .end(function (err, res) {
                expect(!!err).toBe(false);
                expect(res.text).toBe('post');

                done();
            });
    });
});

