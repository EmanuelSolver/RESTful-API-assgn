import { makeComment, makePost } from './controllers/userController.js';
import { login, register, loginRequired } from '../controllers/authController.js';

const routes = (app) => {
    //Restricted routes, you have to login first
    app.route('/comment/:id')
        .post(loginRequired, makeComment)

    app.route('/post/:id')
        .post(loginRequired, makePost)
  

    // open routes
    app.route('/register')
        .post(register);

    app.route('/login')
        .post(login);


};
export default routes;