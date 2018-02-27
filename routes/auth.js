const path = require('path');
const authService = require(path.join(appRoot, 'lib', 'service', 'auth')).http();
const hasRole = authService.hasRole;
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const express = require('express');
const router = express.Router();

router.get('/', hasRole('STAFF'), (req, res) => {
  /** check authentication */
  var resDTO = new ResDTO();
  resDTO.statusOK();
  res.send(resDTO);
});

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  authService.login(username, password).then(resDTO => {
    req.session.userInfo = resDTO.data;
    return res.send(resDTO);
  });
});

router.get('/logout', authService.logout(), (req, res) => {
  var resDTO = new ResDTO();
  resDTO.statusFail('logout failed.');
  if (!req.session) {
    resDTO.statusOK('logout success.');
  }
  return res.send(resDTO);
});

module.exports = router;