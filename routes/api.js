const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
        totalWeight: {
          $sum: "$exercises.weight",
        },
      },
    },
  ])
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/api/workouts/range", (reg, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
        totalWeight: {
          $sum: "$exercises.weight",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  // updates excercises for the day
  Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },

    {
      $push: {
        exercises: req.body,
      },
    },
    {
      new: true,
    }
  )
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
