import express from "express";
import initApiRoutes from "./routes/initApiRoutes";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';  // Add this import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8082;


//config cors
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    let allowOrigins = process.env.ALLOW_ORIGINS;
    if (allowOrigins) allowOrigins = allowOrigins.split(',');
    if (req.header('origin')) {
        res.setHeader(
            'Access-Control-Allow-Origin',
            allowOrigins.includes(req.header('origin').toLowerCase()) ? req.headers.origin : "default");
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // Pass to next layer of middleware
    next();
});


//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
// connection();

//config cookie-parser
app.use(cookieParser());

//init api routes
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> React Ultimate Backend is running on the port = " + PORT);
})