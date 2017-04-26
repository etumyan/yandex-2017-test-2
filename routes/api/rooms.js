const models  = require('../../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.Room.findAll().then((rooms) => res.json({ success: true, data: rooms }));
});

router.post('/', (req, res) => {
  models.Room.create({
    name: req.body.name,
    capacity: req.body.capacity,
    description: req.body.description
  }).then((room) => res.json({ success: true, data: { id: room.id } }));
});

router.get('/:roomId', (req, res) => {
  models.Room.findOne({
    where: {
      id: req.params.roomId
    }
  }).then((room) => res.json({ success: true, data: room }));
});

router.put('/:roomId', (req, res) => {
  models.Room.update({
    name: req.body.name,
    capacity: req.body.capacity,
    description: req.body.description
  }, {
    where: {
      id: req.params.roomId
    }
  }).then(() => res.json({ success: true }));
});

router.delete('/:roomId', (req, res) => {
  models.Room.destroy({
    where: {
      id: req.params.roomId
    }
  }).then(() => res.json({ success: true }));
});

module.exports = router;
