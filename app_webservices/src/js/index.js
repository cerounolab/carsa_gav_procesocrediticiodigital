'use strict';

require('dotenv').config({ path:__dirname+'/./../../.env' });

const host              = process.env.NODE_HOST;
const port              = process.env.NODE_PORT;
const api_user          = process.env.NODE_API_CLIENT;
const api_pass          = process.env.NODE_API_KEY;
const api_auth          = process.env.NODE_API_AUTH;
const swagger_host      = process.env.SWAGGER_HOST01;
const express           = require('express');
const cors              = require('cors');

var whitelist = ['http://localhost', 'http://localhost:'+port];
var corsOptions = {
   /*
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  */
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

const basicAuth         = require('express-basic-auth');
const swaggerJsDoc      = require('swagger-jsdoc');
const swaggerUi         = require('swagger-ui-express');
const swaggerOptions    = {
    swaggerDefinition : {
        basePath: '/v1',
        openapi: '3.0.3',
        info : {
            title : 'API Restful BROSCO',
            description : 'Servicios disponible',
            termsOfService : 'termsOfService',
            contact : {
                name : 'CEROUNO Labs',
                url : 'https://cerouno.com.py'
            },
            license : {
                name : 'Apache 2.0',
                url : 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
            version : '1.0.0'
        },
        schemes: [
            'http',
            'https'
        ],
        consumes: [
            'application/json'
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'basic',
                    description: 'Basic Authroization header.',
                },
            },
        },
        security: {
            bearerAuth: []
        },
        servers: [
            {
                url: swagger_host,
                description: 'URL Base',
            }
        ],
        schemes: [
            "http", "https"
        ],
    },
    apis : ['./src/swagger/*.js']
};
const swaggerDocs       = swaggerJsDoc(swaggerOptions);
const newDate           = new Date();
const currentDate       = newDate.getFullYear() + '' + ((newDate.getMonth() < 10) ? ('0' + newDate.getMonth()) : newDate.getMonth()) + ((newDate.getDate() < 10) ? ('0' + newDate.getDate()) : newDate.getDate());

var app                 = express();
var morgan              = require('morgan') 
var path                = require('path');
var rotatingFileStream  = require('rotating-file-stream')
var accessLogStream     = rotatingFileStream.createStream('access_'+ currentDate +'.log', {
    interval: '1d',
    path: path.join(__dirname + './../', 'logs')
});

//functions
function getUnAuthorizedResponse(authRequest) {
    const _dataJSON00 = {
        'code' : 401,
        'status' : 'Unauthorized',
        'mensaje_ref' : 'ERROR: En autenticación 1000',
        'message_short': 'ERROR: El usuario y/o contraseña no coinciden, favor verificar.',
        'message_error': 'ERROR: El usuario y/o contraseña no coinciden, favor verificar.',
        'page_current': null,
        'page_rows': null,
        'data_rows': null,
        'data_limit': null,
        'data': [],
    };

    const _dataJSON01 = {
        'code' : 401,
        'status' : 'Unauthorized',
        'mensaje_ref' : 'ERROR: En autenticación 1001',
        'message_short': 'ERROR: Se requiere una autenticación al servicio del API RestFul',
        'message_error': 'ERROR: Se requiere una autenticación al servicio del API RestFul',
        'page_current': null,
        'page_rows': null,
        'data_rows': null,
        'data_limit': null,
        'data': [],    
    };

    return authRequest.auth ? _dataJSON00 : _dataJSON01
}

//swaggerUI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//loggers
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Special-Request-Header, Cache-Control, Pragma, Accept-Encoding');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Content-Type', 'application/json');

    next();
});

//middlewares
app.use(basicAuth({
    users: JSON.parse(api_auth),
    unauthorizedResponse: getUnAuthorizedResponse
}));

//routes
app.use(require('./../conf/route'));

//Runs
app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});