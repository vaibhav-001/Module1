const express = require('express');
const { generateResponse } = require('../AI/openai');

const router= express.Router()

router.get('/', generateResponse)

module.exports= router