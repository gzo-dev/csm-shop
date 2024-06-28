import express from 'express';
import authController from './auth.controller';
import authenticateJWT from '../../../middleware/verify_token';
// import { localStrategy , jwtStrategy} from '../../../middleware/strategy';
// import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const authRouter = express.Router();
authRouter.route('/register').post(authController.addUser);
authRouter.route('/user/getAllUserList').get(authenticateJWT, authController.getAllUserList);
authRouter.route('/user/leader').get(authController.getAllLeader);
authRouter.route('/user/update').post(authController.userUpdate);
authRouter.route('/user/delete').post(authController.deleteUserList);
authRouter.route('/info').get(authController.findUser);
authRouter.route('/rootLogin').post(authController.login);
authRouter.route('/verification').post(authController.verifyMail)
authRouter.route('/leader/list/employee').get(authController.getListEmployeeOfLeader)
authRouter.route('/leader/list/employee').put(authController.updateEmployeeOfLeader)



