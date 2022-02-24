module.exports = function (app) {
    const express = require('express');
    const router = express.Router();

    const sugang = require('../controllers/sugangController.js');

    const register = require('../controllers/registerController.js');

    app.get('/subjects', sugang.getSubjects);
    app.get('/subjects/:subjectId', sugang.getSubject);
    app.post('/subjects', sugang.getMySubjectList);

    app.post('/register', register.register);
    app.post('/plzGetOut', register.monitoring);
    app.post('/insert', register.firstIn);
    app.post('/junhyeok', register.JunHyeok);

    // app.post('/click', sugang.startMonitoring);
};
