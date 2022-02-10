import express from 'express';

// const departmentRouter = require('./routers/department.js');

const app = express();
import changeRoutes from './routers/changeRoutes.js';

// app.use('/departments',departmentRouter)
// require('./routers/department.js')(app);

app.use(express.json());

app.post('/init', changeRoutes);

app.post('/change', changeRoutes);

app.post('/changeAll', changeRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
