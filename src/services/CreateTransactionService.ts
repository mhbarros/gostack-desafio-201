import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: Omit<Transaction, 'id'>): Transaction {
    if(type !== 'income' && type !== 'outcome'){
      throw new Error('Invalid type');
    }

    return this.transactionsRepository.create({title, type, value});
  }
}

export default CreateTransactionService;
