// Simple utility functions for localStorage operations

// Get data from localStorage
export function getData(key) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

// Save data to localStorage
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Remove data from localStorage
export function removeData(key) {
  localStorage.removeItem(key);
}

// Check if user has completed survey
export function hasCompletedSurvey() {
  const profile = getData('userProfile');
  return profile !== null && profile.surveyCompleted === true;
}

// Get user profile
export function getUserProfile() {
  return getData('userProfile') || {};
}

// Save user profile
export function saveUserProfile(profile) {
  saveData('userProfile', { ...profile, surveyCompleted: true });
}

// Get today's date as string (YYYY-MM-DD)
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

// Get workout progress for today
export function getTodayProgress() {
  const today = getTodayString();
  const progress = getData('workoutProgress') || {};
  return progress[today] || { completedExercises: [], sessionComplete: false };
}

// Save workout progress for today
export function saveTodayProgress(completedExercises, sessionComplete) {
  const today = getTodayString();
  const progress = getData('workoutProgress') || {};
  progress[today] = { completedExercises, sessionComplete };
  saveData('workoutProgress', progress);
}

// Get streak count
export function getStreak() {
  const streakData = getData('streakData') || { count: 0, lastWorkoutDate: null };
  return streakData;
}

// Update streak after completing workout
export function updateStreak() {
  const today = getTodayString();
  const streakData = getStreak();
  
  // If already worked out today, don't change streak
  if (streakData.lastWorkoutDate === today) {
    return streakData.count;
  }
  
  // Check if yesterday was the last workout
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];
  
  let newCount;
  if (streakData.lastWorkoutDate === yesterdayString) {
    // Continue streak
    newCount = streakData.count + 1;
  } else if (streakData.lastWorkoutDate === null) {
    // First workout ever
    newCount = 1;
  } else {
    // Streak broken, start fresh
    newCount = 1;
  }
  
  saveData('streakData', { count: newCount, lastWorkoutDate: today });
  return newCount;
}

// Clear all fitness data (for testing/reset)
export function clearAllData() {
  removeData('userProfile');
  removeData('workoutProgress');
  removeData('streakData');
}