const express = require('express');
const router = express.Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.status(400).json(err);
  
    })
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.status(400).json(err);
  
    })

});

router.get("/api/workouts/:id", (req, res) => {
    
        const { id } = req.params;
        db.Workout.findOne({
            _id: id,
        }).then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json
        })
   
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    // console.log(body, params)
    const id = params.id;
    let savedExercises = [];

    db.Workout.find({_id: id})
        .then(workouts => {
            savedExercises = workouts[0].exercises;
            res.json(savedExercises);
            let allExercises = [...savedExercises, body];
            updateWorkout(allExercises);
        })
        .catch(err => {
            res.json(err);
        });

    function updateWorkout(exercises){
        db.Workout.findByIdAndUpdate(id, {exercises: exercises}, function(err, doc){
        if(err){
            console.log(err)
        }
        })
    }        
});


module.exports = router;