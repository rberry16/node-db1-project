const Acc = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const name = req.body.name.trim();
  const budget = Number(req.body.budget);
  if (name === undefined || budget === undefined || !name || budget === null) {
    res.status(400).json({message: 'name and budget are required'});
  } else if (name.length < 3 || name.length > 100) {
    res.status(400).json({message: 'name of account must be between 3 and 100'});
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({message: 'budget of account must be a number'});
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'});
  } else {
    next();
  }
  console.log(budget);
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();
  const isExisting = await db('accounts').where('name', name);
  if (isExisting) {
    res.status(400).json({message: 'that name is taken'});
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Acc.getById(req.params.id);
  if (!account) {
    res.status(404).json({message: 'account not found'});
  } else {
    req.account = account;
    next();
  }
}
