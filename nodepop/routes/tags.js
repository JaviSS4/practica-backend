var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json(
    [
      "lifestyle", "motor", "work", "mobile"
    ]
  )
});

module.exports = router;