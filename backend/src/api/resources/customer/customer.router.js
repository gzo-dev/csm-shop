import express from 'express';
import customerController from './customer.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { customerStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const customerRouter = express.Router();

customerRouter.route('/register').post(customerController.addUser);
customerRouter.route('/getUserByEmailId').get(customerController.findUser);
customerRouter.route('/login').post(customerController.login);


// get all customer
customerRouter.route('/list').get(customerController.getAllCustomer);
customerRouter.route('/update').post(customerController.getCustomerUpdate);
customerRouter.route('/delete').delete(customerController.deleteCustomer);


