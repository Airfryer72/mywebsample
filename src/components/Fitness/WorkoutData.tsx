// Workout database - exercises organized by difficulty and muscle group

export const EXERCISES = {
  // CHEST EXERCISES
  chest: {
    beginner: [
      { name: "Wall Push-ups", sets: 3, reps: "10-12", duration: 5, description: "Stand arm's length from wall, hands shoulder-width apart" },
      { name: "Knee Push-ups", sets: 3, reps: "8-10", duration: 5, description: "Modified push-up with knees on ground" },
      { name: "Incline Push-ups", sets: 3, reps: "8-10", duration: 5, description: "Hands on elevated surface like a bench" },
    ],
    intermediate: [
      { name: "Standard Push-ups", sets: 4, reps: "12-15", duration: 6, description: "Full push-up with proper form" },
      { name: "Wide Push-ups", sets: 3, reps: "10-12", duration: 5, description: "Hands wider than shoulder-width" },
      { name: "Diamond Push-ups", sets: 3, reps: "8-10", duration: 5, description: "Hands close together forming diamond shape" },
    ],
    advanced: [
      { name: "Decline Push-ups", sets: 4, reps: "12-15", duration: 6, description: "Feet elevated on bench or step" },
      { name: "Plyometric Push-ups", sets: 3, reps: "8-10", duration: 6, description: "Explosive push-up with hands leaving ground" },
      { name: "Archer Push-ups", sets: 3, reps: "6-8 each", duration: 7, description: "Shift weight to one arm while extending other" },
    ]
  },
  
  // BACK EXERCISES
  back: {
    beginner: [
      { name: "Superman Hold", sets: 3, reps: "20 sec", duration: 4, description: "Lie face down, lift arms and legs off ground" },
      { name: "Reverse Snow Angels", sets: 3, reps: "10-12", duration: 5, description: "Lie face down, move arms in arc motion" },
      { name: "Bird Dogs", sets: 3, reps: "10 each", duration: 5, description: "On hands and knees, extend opposite arm and leg" },
    ],
    intermediate: [
      { name: "Inverted Rows", sets: 4, reps: "10-12", duration: 6, description: "Using a bar or table edge, pull body up" },
      { name: "Resistance Band Rows", sets: 3, reps: "12-15", duration: 5, description: "Seated row with resistance band" },
      { name: "Prone Y Raises", sets: 3, reps: "12-15", duration: 5, description: "Lie face down, raise arms in Y position" },
    ],
    advanced: [
      { name: "Pull-ups", sets: 4, reps: "8-12", duration: 7, description: "Overhand grip, pull chin above bar" },
      { name: "Chin-ups", sets: 4, reps: "8-10", duration: 7, description: "Underhand grip, pull chin above bar" },
      { name: "Wide Grip Pull-ups", sets: 3, reps: "6-10", duration: 7, description: "Hands wider than shoulder-width" },
    ]
  },
  
  // LEG EXERCISES
  legs: {
    beginner: [
      { name: "Bodyweight Squats", sets: 3, reps: "12-15", duration: 5, description: "Feet shoulder-width, lower until thighs parallel" },
      { name: "Wall Sit", sets: 3, reps: "30 sec", duration: 4, description: "Back against wall, hold seated position" },
      { name: "Calf Raises", sets: 3, reps: "15-20", duration: 4, description: "Rise onto toes, lower slowly" },
    ],
    intermediate: [
      { name: "Lunges", sets: 3, reps: "12 each", duration: 6, description: "Step forward, lower back knee toward ground" },
      { name: "Jump Squats", sets: 3, reps: "10-12", duration: 5, description: "Squat down, explode upward" },
      { name: "Step-ups", sets: 3, reps: "10 each", duration: 6, description: "Step onto elevated surface, drive through heel" },
    ],
    advanced: [
      { name: "Bulgarian Split Squats", sets: 4, reps: "10 each", duration: 7, description: "Rear foot elevated, lower into lunge" },
      { name: "Pistol Squats", sets: 3, reps: "5-8 each", duration: 8, description: "Single leg squat with other leg extended" },
      { name: "Box Jumps", sets: 4, reps: "8-10", duration: 6, description: "Jump onto elevated platform" },
    ]
  },
  
  // SHOULDER EXERCISES
  shoulders: {
    beginner: [
      { name: "Arm Circles", sets: 3, reps: "20 each", duration: 3, description: "Small to large circles, both directions" },
      { name: "Wall Slides", sets: 3, reps: "10-12", duration: 4, description: "Back to wall, slide arms up and down" },
      { name: "Front Raises", sets: 3, reps: "12-15", duration: 4, description: "Raise straight arms to shoulder height" },
    ],
    intermediate: [
      { name: "Pike Push-ups", sets: 3, reps: "10-12", duration: 5, description: "Hips high, lower head toward ground" },
      { name: "Lateral Raises", sets: 3, reps: "12-15", duration: 5, description: "Raise arms out to sides" },
      { name: "Shoulder Taps", sets: 3, reps: "20 total", duration: 4, description: "In plank, tap opposite shoulder" },
    ],
    advanced: [
      { name: "Handstand Push-ups", sets: 3, reps: "5-8", duration: 7, description: "Against wall, lower head to ground" },
      { name: "Dive Bomber Push-ups", sets: 3, reps: "8-10", duration: 6, description: "Flow from downward to upward dog" },
      { name: "Planche Leans", sets: 3, reps: "20 sec", duration: 5, description: "Lean forward in push-up position" },
    ]
  },
  
  // CORE EXERCISES
  core: {
    beginner: [
      { name: "Dead Bug", sets: 3, reps: "10 each", duration: 5, description: "On back, lower opposite arm and leg" },
      { name: "Plank", sets: 3, reps: "20-30 sec", duration: 4, description: "Hold straight body position on forearms" },
      { name: "Knee Crunches", sets: 3, reps: "15-20", duration: 4, description: "Basic crunch with knees bent" },
    ],
    intermediate: [
      { name: "Bicycle Crunches", sets: 3, reps: "20 total", duration: 5, description: "Alternate elbow to opposite knee" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec", duration: 5, description: "Alternate driving knees to chest" },
      { name: "Side Plank", sets: 3, reps: "30 sec each", duration: 5, description: "Hold side position on one forearm" },
    ],
    advanced: [
      { name: "Hanging Leg Raises", sets: 4, reps: "10-12", duration: 6, description: "Hang from bar, raise legs to horizontal" },
      { name: "Ab Wheel Rollouts", sets: 3, reps: "10-12", duration: 6, description: "Roll out and back while maintaining core tension" },
      { name: "Dragon Flags", sets: 3, reps: "6-8", duration: 7, description: "Lower body as straight line from shoulders" },
    ]
  },
  
  // ARMS EXERCISES
  arms: {
    beginner: [
      { name: "Tricep Dips (Chair)", sets: 3, reps: "10-12", duration: 5, description: "Hands on chair, lower body down" },
      { name: "Bicep Curls (Bands)", sets: 3, reps: "12-15", duration: 4, description: "Stand on band, curl handles up" },
      { name: "Wrist Curls", sets: 3, reps: "15-20", duration: 3, description: "Rest forearm, curl wrist up and down" },
    ],
    intermediate: [
      { name: "Close Grip Push-ups", sets: 3, reps: "10-12", duration: 5, description: "Hands close together, elbows tight" },
      { name: "Chin-up Hold", sets: 3, reps: "15-20 sec", duration: 5, description: "Hold at top of chin-up position" },
      { name: "Tricep Extensions", sets: 3, reps: "12-15", duration: 5, description: "Overhead extension with band or weight" },
    ],
    advanced: [
      { name: "Ring Dips", sets: 4, reps: "8-12", duration: 7, description: "Dips on gymnastic rings" },
      { name: "Muscle-ups", sets: 3, reps: "3-5", duration: 8, description: "Pull-up transitioning over the bar" },
      { name: "One Arm Push-ups", sets: 3, reps: "5-8 each", duration: 7, description: "Full push-up on one arm" },
    ]
  },
  
  // CARDIO EXERCISES
  cardio: {
    beginner: [
      { name: "Marching in Place", sets: 1, reps: "3 min", duration: 3, description: "High knees while standing" },
      { name: "Step Touch", sets: 1, reps: "3 min", duration: 3, description: "Side step touching feet together" },
      { name: "Light Jumping Jacks", sets: 3, reps: "30 sec", duration: 4, description: "Modified jacks with smaller range" },
    ],
    intermediate: [
      { name: "Jumping Jacks", sets: 3, reps: "45 sec", duration: 5, description: "Full range jumping jacks" },
      { name: "High Knees", sets: 3, reps: "30 sec", duration: 4, description: "Run in place bringing knees high" },
      { name: "Burpees (No Jump)", sets: 3, reps: "10-12", duration: 6, description: "Squat thrust without the jump" },
    ],
    advanced: [
      { name: "Burpees", sets: 4, reps: "12-15", duration: 7, description: "Full burpee with jump" },
      { name: "Tuck Jumps", sets: 3, reps: "10-12", duration: 5, description: "Jump bringing knees to chest" },
      { name: "Sprint Intervals", sets: 6, reps: "30 sec", duration: 8, description: "All-out sprint followed by rest" },
    ]
  },
  
  // FLEXIBILITY/RECOVERY EXERCISES
  flexibility: {
    beginner: [
      { name: "Neck Stretches", sets: 1, reps: "30 sec each", duration: 3, description: "Tilt head side to side, forward and back" },
      { name: "Cat-Cow Stretch", sets: 1, reps: "10 cycles", duration: 3, description: "Arch and round back on hands and knees" },
      { name: "Child's Pose", sets: 1, reps: "60 sec", duration: 2, description: "Kneel, sit back, arms extended forward" },
    ],
    intermediate: [
      { name: "Pigeon Pose", sets: 1, reps: "60 sec each", duration: 4, description: "Hip opener, one leg forward bent" },
      { name: "Seated Forward Fold", sets: 1, reps: "60 sec", duration: 2, description: "Legs straight, reach for toes" },
      { name: "Thoracic Rotations", sets: 1, reps: "10 each", duration: 3, description: "On side, rotate upper body" },
    ],
    advanced: [
      { name: "Pancake Stretch", sets: 1, reps: "90 sec", duration: 4, description: "Seated wide legs, fold forward" },
      { name: "Wheel Pose", sets: 3, reps: "30 sec", duration: 5, description: "Full backbend from floor" },
      { name: "Splits Practice", sets: 1, reps: "90 sec each", duration: 6, description: "Work toward full front splits" },
    ]
  }
};

// Workout templates based on goals
export const WORKOUT_TEMPLATES = {
  buildMuscle: {
    name: "Build Muscle",
    focusAreas: ["chest", "back", "legs", "shoulders", "arms", "core"],
    exercisesPerWorkout: 5,
    restBetweenSets: "60-90 seconds"
  },
  getStronger: {
    name: "Get Stronger",
    focusAreas: ["legs", "back", "chest", "core", "shoulders"],
    exercisesPerWorkout: 4,
    restBetweenSets: "90-120 seconds"
  },
  loseWeight: {
    name: "Lose Weight",
    focusAreas: ["cardio", "legs", "core", "chest", "back"],
    exercisesPerWorkout: 6,
    restBetweenSets: "30-45 seconds"
  },
  recoverFromInjury: {
    name: "Recovery",
    focusAreas: ["flexibility", "core", "legs"],
    exercisesPerWorkout: 4,
    restBetweenSets: "60 seconds"
  },
  generalFitness: {
    name: "General Fitness",
    focusAreas: ["cardio", "core", "legs", "chest", "back", "flexibility"],
    exercisesPerWorkout: 5,
    restBetweenSets: "45-60 seconds"
  }
};

// Day-specific muscle group rotations
export const WEEKLY_SPLIT = {
  0: ["chest", "core"], // Sunday
  1: ["back", "arms"], // Monday
  2: ["legs", "cardio"], // Tuesday
  3: ["shoulders", "core"], // Wednesday
  4: ["chest", "back"], // Thursday
  5: ["legs", "arms"], // Friday
  6: ["cardio", "flexibility"] // Saturday
};

// Function to generate workout based on user profile
export function generateWorkout(userProfile) {
  const dayOfWeek = new Date().getDay();
  const muscleGroups = WEEKLY_SPLIT[dayOfWeek];
  
  // Determine difficulty level
  let difficulty;
  if (userProfile.experience === "beginner" || userProfile.yearsExperience < 1) {
    difficulty = "beginner";
  } else if (userProfile.experience === "intermediate" || userProfile.yearsExperience < 3) {
    difficulty = "intermediate";
  } else {
    difficulty = "advanced";
  }
  
  // Check if user wants to work out today
  const workoutDays = userProfile.workoutDays || [];
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const todayName = dayNames[dayOfWeek];
  
  if (workoutDays.length > 0 && !workoutDays.includes(todayName)) {
    return {
      isRestDay: true,
      message: "Today is your rest day. Recovery is important for progress!",
      muscleGroups: [],
      exercises: [],
      totalDuration: 0
    };
  }
  
  // Build workout
  const exercises = [];
  let totalDuration = 5; // Warm-up time
  
  muscleGroups.forEach(function(group) {
    if (EXERCISES[group] && EXERCISES[group][difficulty]) {
      const groupExercises = EXERCISES[group][difficulty];
      // Pick 2-3 exercises per muscle group
      const count = Math.min(2, groupExercises.length);
      for (let i = 0; i < count; i++) {
        const exercise = groupExercises[i];
        exercises.push({
          ...exercise,
          muscleGroup: group,
          id: group + "-" + i
        });
        totalDuration = totalDuration + exercise.duration;
      }
    }
  });
  
  // Adjust based on goal
  if (userProfile.goal === "recoverFromInjury") {
    // Add flexibility exercises
    const flexExercises = EXERCISES.flexibility[difficulty] || EXERCISES.flexibility.beginner;
    exercises.push({
      ...flexExercises[0],
      muscleGroup: "flexibility",
      id: "flex-0"
    });
  }
  
  return {
    isRestDay: false,
    muscleGroups: muscleGroups,
    exercises: exercises,
    totalDuration: totalDuration,
    difficulty: difficulty,
    restBetweenSets: difficulty === "beginner" ? "60-90 seconds" : 
                     difficulty === "intermediate" ? "45-60 seconds" : "30-45 seconds"
  };
}