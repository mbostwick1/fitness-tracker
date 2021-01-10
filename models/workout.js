const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// creates  schema
const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    //type of exercise to be loggednpm st
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type",
        },

        // exercise info to be logged
        name: {
          type: String,
          trim: true,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
