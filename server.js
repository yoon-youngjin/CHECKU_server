import express from 'express';

// const departmentRouter = require('./routers/department.js');
import fetch from 'node-fetch';
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// (async () => {
//     let arr = [
//         122058, 122062, 122410, 122412, 120809, 122096, 122097, 122098, 122099, 126791, 102761, 102931, 103022, 121253, 121254, 121255, 121256, 121257, 121259, 122281, 127032, 127033, 127034, 127107,
//         127363, 127425, 127426, 104951, 104981, 104991, 105001, 105011, 105031, 105041, 121175, 127119, 127120, 127121, 127122, 127123, 127124, 127125, 127126, 127460, 103851, 103901, 121218, 103911,
//         103912, 126782, 126790, 126841, 126896, 126906, 126907, 126908, 126909, 126910, 126911, 126912, 122047, 122048, 126793, 104581, 104601, 122100, 122102, 122103, 122104, 126792, 105061, 105091,
//         105101, 122045, 122071, 122080, 122402, 122403, 122404, 122405, 122406, 122407, 122408, 122409, 126781, 126799, 127128, 105121, 105251, 121242, 121243, 121244, 121260, 121261, 121263, 126783,
//         105441, 105451, 126778, 126779, 103681, 103731, 103741, 103751, 126788, 126789, 127307, 127538, 127539,
//     ];

//     let promises = arr.map(async (data) => {
//         return await fetch('https://kuis.konkuk.ac.kr/CmmnDeptSearchPop/find.do', {
//             headers: {
//                 accept: '*/*',
//                 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//                 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//                 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//                 'sec-ch-ua-mobile': '?0',
//                 'sec-ch-ua-platform': '"Windows"',
//                 'sec-fetch-dest': 'empty',
//                 'sec-fetch-mode': 'cors',
//                 'sec-fetch-site': 'same-origin',
//                 'x-requested-with': 'XMLHttpRequest',
//                 cookie: 'WMONID=M0F_dOVS0e7; _gcl_au=1.1.1049358571.1644404645; Login=; UTF8_Option=0; LoginCookie=294716365834294713062947178824253758178829475340370353170607311513063115409623315317071025420734110720043115130631154096233153173115233107100050370307100050071017880710562246051788071000500931178825425622; JSESSIONID=0001oea45PhlEt7TMWlShTYJ-Vm:1CAUM7FB34',
//                 Referer: 'https://kuis.konkuk.ac.kr/index.do',
//                 'Referrer-Policy': 'strict-origin-when-cross-origin',
//             },
//             body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23strDeptCd=&%40d1%23strCampFg=1&%40d1%23strOrgnFg=1&%40d1%23strDeptNm=&%40d1%23strValue=${data}&%40d1%23striDeptCd=${data}&%40d1%23striDeptNm=&%40d1%23strHaksFg=&%40d1%23strUseFg=&%40d1%23strLesnUseFg=1&%40d1%23strEntrUseFg=&%40d1%23strHaksUseFg=&%40d1%23strMenuCd=&%40d1%23strUseGrd=&%40d1%23strUserId=&%40d1%23strAuthDeptCd=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&`,
//             method: 'POST',
//         })
//             .then((e) => e.json())
//             .then((e) => e.DS_CMMN510[0].KOR_TTNM );
//     });

//     await Promise.all(promises).then((e) => console.log(e));
// })();

import changeRoutes from './routers/changeRoutes.js';

// app.use('/departments',departmentRouter)
// require('./routers/department.js')(app);

app.use(express.json());

app.post('/init', changeRoutes);

app.post('/change', changeRoutes);

app.post('/changeAll', changeRoutes);

app.post('/click', changeRoutes);

app.get('/subjects', changeRoutes);

app.post('/insertSubject',changeRoutes);
const port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
