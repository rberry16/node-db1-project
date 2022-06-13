const router = require('express').Router()
const Acc = require('./accounts-model');
const md = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  const accounts = await Acc.getAll();
  res.json(accounts);
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', md.checkAccountPayload, async (req, res, next) => {
  const account = await Acc.create(req.body);
  res.status(201).json(account);
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
