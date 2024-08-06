import express from 'express';
import authController from './auth.controller';
import authenticateJWT from '../../../middleware/verify_token';
import recaptchaMiddleware from '../../../middleware/recaptcha';
// import { localStrategy , jwtStrategy} from '../../../middleware/strategy';
// import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const authRouter = express.Router();
authRouter.route('/register').post(authenticateJWT, authController.addUser);
authRouter.route('/2fa').post(authenticateJWT, authController.verify2fa);
authRouter.route('/verify/otp').post(authenticateJWT, authController.verifyOtp);
authRouter.route('/user/getAllUserList').get(authenticateJWT, authController.getAllUserList);
authRouter.route('/info').get(authenticateJWT, authController.findUser);
authRouter.route('/user/leader').get(authController.getAllLeader);
authRouter.route('/user/update').post(authController.userUpdate);
authRouter.route('/user/delete').post(authController.deleteUserList);
authRouter.route('/rootLogin').post(recaptchaMiddleware, authController.login);
authRouter.route('/verification').post(authController.verifyMail)
authRouter.route('/leader/list/employee').get(authenticateJWT, authController.getListEmployeeOfLeader)
authRouter.route('/filter/leader/list/employee').get(authenticateJWT, authController.getListEmployeeOfLeader)
authRouter.route('/leader/list/employee').put(authController.updateEmployeeOfLeader)
// authRouter.route('/test-mail').put(authController.testMail)
// authRouter.route('/test-crawl').get(authController.crawlData)
// authRouter.route('/test-mail-single').put(authController.testMailSingle)



