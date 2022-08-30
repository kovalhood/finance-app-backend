const express = require('express');

const ctrlTransactions = require("../../controllers/transaction");
const {ctrlWrapper} = require("../../helpers");
const {isValidId, validation} = require("../../middlewares");
const {schemas:balanceSchema} = require('../../models/user');
const {schemas:transactionSchema} = require('../../models/transactions');

const router = express.Router();


router.post('/balance', validation(balanceSchema.updateBalanceSchema), ctrlWrapper(ctrlTransactions.setBalance));

router.get('/balance', ctrlWrapper(ctrlTransactions.getBalance));

//router.get('/', ctrlWrapper(ctrlTransactions.getReportsTrans));

//router.post('/', validation(transactionSchema.addSchema), ctrlWrapper(ctrlTransactions.addTransaction)); // В модель необходимо добавить addSchema-Joi

router.delete('/:transactionId', isValidId, ctrlWrapper(ctrlTransactions.deleteTransaction));

router.get('/day', ctrlWrapper(ctrlTransactions.getReportsTrans));

router.get('/months', ctrlWrapper(ctrlTransactions.getSummaryTrans));


module.exports = router;
