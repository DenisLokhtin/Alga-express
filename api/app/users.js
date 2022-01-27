const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      phone: {number: req.body.phone},
      name: req.body.name,
    });

    user.generateToken();
    await user.save();
    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  let user = await User.findOne({email: req.body.email});

  console.log(user);
  if (!user) {
    return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
  }

  user.generateToken();
  await user.save({validateBeforeSave: false});

  user = await User.findOne({email: req.body.email})
      .select('token role name balance phone avatar');

  res.send(user);
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();

  await user.save({validateBeforeSave: false});

  return res.send(success);
});

module.exports = router;





















