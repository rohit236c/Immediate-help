const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const validate = require('./modules/authetication/validate/validate');

require('./config/mongoose');
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token', 'authorization']
};
app.use(cors(corsOption));
let arr = [];
arr.push('/' + 'users*');

app.all(arr, [validate.validateToken]);
app.use('/', require('./routes/index')(router));


app.listen('2020',()=>{
    console.log('express server is at: http://localhost:2020');
});