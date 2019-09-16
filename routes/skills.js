const express = require('express');
const router = express.Router();
const axios = require('axios');
const skillModel = require('../models/skillModel');

/* GET users listing. */
router.get('/:serverName/:nickName', (req, res, next) => {
  const nickName = req.params.nickName;
  const serverName = req.params.serverName;
  skillModel.getSkills(serverName, nickName)
    .then(resp => res.json(resp))
    .catch(err => res.status(404).send(err))
});

module.exports = router;
