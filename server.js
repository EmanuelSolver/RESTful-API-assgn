import express from 'express';
import config from './db/config.js';
import routes from './routes/routes.js';
import jwt from 'jsonwebtoken';

//instatiating express App
const app = express();
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// using routes and passing app as an arguement
routes(app);

app.get('/', (req, res) => {
    res.send("Njiru's RESTFUL API!");
});

//cheching the port
app.listen(config.port, () => {
    console.log(`Server is running on ${config.url}`);
});