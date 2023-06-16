// import { comment, post } from '../controllers/userController.js';
import { login, register, loginRequired } from '../controllers/authController.js';

const routes = (app) => {
    //Restricted routes, you have to login first
    // app.route('/comment')
    //     .get(loginRequired, getAll)
    //     .delete(loginRequired, removeStudent)

    // app.route('/post')
    //     .put(loginRequired, updateInfo)
    //     .get(loginRequired, getInfo)
  

    // open routes
    app.route('/register')
        .post(register);

    app.route('/login')
        .post(login);


};
export default routes;