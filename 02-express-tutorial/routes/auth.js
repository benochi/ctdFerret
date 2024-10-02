const express = require("express");
const router = express.Router();
const { logon, logoff, testAuth } = require("../controllers/auth");

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.post('/logon', logon);
router.delete('/logoff', auth, logoff);
router.get('/test', auth, testAuth);

module.exports = router;
