const express = require('express');
const router = express.Router();
const axios = require('axios');
const skillModel = require('../models/skillModel');

/* GET users listing. */
router.get('/:nickName', (req, res, next) => {
  const nickName = req.params.nickName;
  skillModel.getSkills(nickName)
    .then(resp => res.json(resp));
});

module.exports = router;