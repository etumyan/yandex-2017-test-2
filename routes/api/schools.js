const models  = require('../../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.School.findAll().then((schools) => res.json({ success: true, data: schools }));
});

router.post('/', (req, res) => {
  models.School.create({
    name: req.body.name,
    studentNumber: req.body.studentNumber
  }).then((school) => res.json({ success: true, data: { id: school.id } }));
});

router.get('/:schoolId', (req, res) => {
  models.School.findOne({
    where: {
      id: req.params.schoolId
    }
  }).then((school) => res.json({ success: true, data: school }));
});

router.put('/:schoolId', (req, res) => {
  models.School.update({
    name: req.body.name,
    studentNumber: req.body.studentNumber
  }, {
    where: {
      id: req.params.schoolId
    }
  }).then(() => res.json({ success: true }));
});

router.delete('/:schoolId', (req, res) => {
  models.School.destroy({
    where: {
      id: req.params.schoolId
    }
  }).then(() => res.json({ success: true }));
});

module.exports = router;
