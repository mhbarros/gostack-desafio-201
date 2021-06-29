import { Router } from 'express';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {

    const transactions = transactionsRepository.all();
    response.json(transactions);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const { title, value, type }: Omit<Transaction, 'id'> = request.body;
    const newTransaction = new CreateTransactionService(transactionsRepository).execute({title, type, value});

    return response.json(newTransaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
