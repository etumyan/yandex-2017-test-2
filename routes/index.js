const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.redirect('/lectures');
});

router.get('/lectures', (req, res) => {
  models.Lecture.findAll({
    include: [ models.School, models.Room ]
  }).then((lectures) => res.render('sections/lectures', { path: req.path, lectures } ));
});

router.get('/schools', (req, res) => {
  models.School.findAll().then((schools) => res.render('sections/schools', { path: req.path, schools }));
});

router.get('/rooms', (req, res) => {
  models.Room.findAll().then((rooms) => res.render('sections/rooms', { path: req.path, rooms }));
});

module.exports = router;
