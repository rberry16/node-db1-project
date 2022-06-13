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

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAcc = await Acc.create({name: req.body.name.trim(), budget: req.body.budget});
    const account = await Acc.getById(newAcc[0]);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    await Acc.updateById(req.params.id, ({name: req.body.name.trim(), budget: req.body.budget}));
    const updated = await Acc.getById(req.params.id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    const account = await Acc.getById(req.params.id);
  await Acc.deleteById(req.params.id);
  res.json(account);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.json({
    message: 'there was an error',
    err: err.message,
    stack: err.stack
  });
});

module.exports = router;
