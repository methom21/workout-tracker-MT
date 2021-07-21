const router = require("express").Router() 
const Workout = require("../models/workout")

router.post('/api/workouts', (req, res)=>{
    Workout.create({})
    .then((workoutdb)=>{
        res.json(workoutdb)
    })
    .catch((err)=>{
        res.json(err)
    })
});
router.put("/api/workouts/:id", ({body, params},res)=>{
    Workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises:body}},
        {new: true, runValidators: true }
    )
    .then((workoutdb)=>{
        res.json(workoutdb)
    })
    .catch((err)=>{
        res.json(err)
    })
});
router.get("/api/workouts", (req, res)=>{
    Workout.aggregate({
        $addFields: {
            totalDuration: {
                $sum: "$exercise.duration"
            }
        }
    })
    .then((workoutdb)=>{
        res.json(workoutdb)
    })
    .catch((err)=>{
        res.json(err)
    })
})
router.get("/api/workouts/range", (req, res)=>{
    Workout.aggregate({
        $addFields: {
            totalDuration: {
                $sum: "$exercise.duration"
            }
        }
    })
    .sort({_id:-1})
    .limit(7)
    .then((workoutdb)=>{
        res.json(workoutdb)
    })
    .catch((err)=>{
        res.json(err)
    })
})
router.delete("api/workouts", ({body},res)=>{
    Workout.findByIdAndDelete(body.id)
    .then(()=>{
        res.json(true)
    })
    .catch((err)=>{
        res.json(err)
    })
})
module.exports = router;