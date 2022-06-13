const router = require('express').Router()
const Acc = require('./accounts-model');
const md = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Acc.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  try {
    res.json(req.account);
  } catch (err) {
    next(err);
  }
})

router.post('/', md.checkAccountPayload, async (req, res, next) => {
  try {
    const newAcc = await Acc.create(req.body);
    const account = await Acc.getById(newAcc[0]);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.json({
    message: 'there was an error',
    err: err.message,
    stack: err.stack
  });
});

module.exports = router;
