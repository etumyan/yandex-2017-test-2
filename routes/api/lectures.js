const models  = require('../../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.Lecture.findAll({
    where: {
      // id: req.body.schoolId
    }
  }).then((lectures) => res.json({ success: true, data: lectures }));
});

router.post('/', (req, res) => {
  models.Lecture.create({
    name: req.body.name,
    reader: req.body.reader,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    RoomId: req.body.RoomId
  }).then((lecture) => {
    lecture.setRoom(req.body.RoomId).then(() => {
      res.json({ success: true, data: { id: lecture.id } })
    });
  });
});

router.get('/:lectureId', (req, res) => {
  models.Lecture.findOne({
    where: {
      id: req.params.lectureId
    },
    include: [ models.Room, models.School ]
  }).then((lecture) => res.json({ success: true, data: lecture }));
});

router.put('/:lectureId', (req, res) => {
  models.Lecture.findById(req.params.lectureId).then((lecture) => {
    lecture.update({
      name: req.body.name,
      reader: req.body.reader,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }).then(() => {
      lecture.setRoom(req.body.RoomId).then(() => res.json({ success: true }));
    });
  });
});

router.delete('/:lectureId', (req, res) => {
  models.Lecture.destroy({
    where: {
      id: req.params.lectureId
    }
  }).then(() => res.json({ success: true }));
});

router.post('/:lectureId/schools', (req, res) => {
  models.Lecture.findOne({
    where: {
      id: req.params.lectureId
    }
  }).then((lecture) => {
    models.School.findOne({
      where: {
        id: req.body.schoolId
      }
    }).then((school) => {
      lecture.addSchool(school).then(() => res.json({ success: true }));
    });
  });
});

router.delete('/:lectureId/schools', (req, res) => {
  models.Lecture.findOne({
    where: {
      id: req.params.lectureId
    }
  }).then((lecture) => {
    models.School.findOne({
      where: {
        id: req.body.schoolId
      }
    }).then((school) => {
      lecture.removeSchool(school).then(() => res.json({ success: true }));
    });
  });
});

module.exports = router;
