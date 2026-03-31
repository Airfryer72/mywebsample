import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Clock, 
  Dumbbell, 
  Flame,
  Trophy,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { 
  getUserProfile, 
  hasCompletedSurvey,
  getTodayProgress,
  saveTodayProgress,
  updateStreak,
  getStreak
} from "@/components/fitness/LocalStorageUtils";
import { generateWorkout } from "@/components/fitness/WorkoutData";

export default function TodaysWorkout() {
  const [workout, setWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [newStreak, setNewStreak] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [surveyDone, setSurveyDone] = useState(false);

  useEffect(function() {
    const completed = hasCompletedSurvey();
    setSurveyDone(completed);
    
    if (completed) {
      const profile = getUserProfile();
      const todayWorkout = generateWorkout(profile);
      setWorkout(todayWorkout);
      
      const progress = getTodayProgress();
      setCompletedExercises(progress.completedExercises);
      setSessionComplete(progress.sessionComplete);
    }
  }, []);

  // Toggle exercise completion
  function toggleExercise(exerciseId) {
    if (sessionComplete) return;
    
    let newCompleted;
    if (completedExercises.includes(exerciseId)) {
      newCompleted = completedExercises.filter(function(id) { return id !== exerciseId; });
    } else {
      newCompleted = [...completedExercises, exerciseId];
    }
    
    if (workout && newCompleted.length === workout.exercises.length) {
      completeSession(newCompleted);
    } else {
      saveTodayProgress(newCompleted, false);
    }
    
    setCompletedExercises(newCompleted);
    console.log("Toggled exercise", exerciseId, "Completed exercises:", newCompleted);
    console.log("Workout:", workout, "Finished:", workout && newCompleted.length === workout.exercises.length, "Session complete:", sessionComplete);
  }

  // Complete the workout session
  function completeSession(tempCompletedExercises = completedExercises) {
    setSessionComplete(true);
    saveTodayProgress(tempCompletedExercises, true);
    
    const streak = updateStreak();
    setNewStreak(streak);
    setShowCongrats(true);
  }

  // Toggle exercise details
  function toggleDetails(exerciseId) {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(exerciseId);
    }
  }

  // Close congratulations popup
  function closeCongrats() {
    setShowCongrats(false);
  }

  // Redirect if survey not done
  if (!surveyDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">Take our quick survey to get your personalized workout plan.</p>
            <Link to={createPageUrl("Survey")}>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500">
                Take Survey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show rest day message
  if (workout && workout.isRestDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😴</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Rest Day</h1>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                {workout.message}
              </p>
              <div className="bg-blue-50 rounded-xl p-4 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">Recovery Tips:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Stay hydrated throughout the day</li>
                  <li>• Get 7-9 hours of quality sleep</li>
                  <li>• Do light stretching or walking</li>
                  <li>• Eat protein-rich meals for muscle repair</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate progress
  const exerciseCount = workout ? workout.exercises.length : 0;
  const completedCount = completedExercises.length;
  const progressPercent = exerciseCount > 0 ? Math.round((completedCount / exerciseCount) * 100) : 0;

  // Recovery tips based on muscle groups
  function getRecoveryTips() {
    const tips = [
      "Drink plenty of water to help muscle recovery",
      "Eat a protein-rich meal within 2 hours",
      "Get at least 7-8 hours of sleep tonight",
      "Light stretching can help reduce soreness",
      "Take a warm shower to relax your muscles"
    ];
    return tips;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      {/* Congratulations Popup */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl animate-in zoom-in duration-300">
            <CardContent className="p-8 text-center relative">
              <button 
                onClick={closeCongrats}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h1>
              <p className="text-gray-600 mb-6">You've completed today's workout!</p>
              
              <div className="bg-orange-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{newStreak}</span>
                  <span className="text-orange-600 font-medium">day streak!</span>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-4 text-left mb-6">
                <h3 className="font-semibold text-emerald-900 mb-2">Recovery Tips:</h3>
                <ul className="text-emerald-800 text-sm space-y-1">
                  {getRecoveryTips().map(function(tip, index) {
                    return <li key={index}>• {tip}</li>;
                  })}
                </ul>
              </div>
              
              <Link to={createPageUrl("Home")}>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-11">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Workout Header Card */}
        {workout && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Today's Focus</p>
                  <h1 className="text-2xl font-bold mt-1 capitalize">
                    {workout.muscleGroups.join(" & ")}
                  </h1>
                </div>
                {sessionComplete && (
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    Completed ✓
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 text-emerald-100 mb-4">
                <span className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  {workout.exercises.length} exercises
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  ~{workout.totalDuration} min
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-100">Progress</span>
                  <span className="font-medium">{completedCount}/{exerciseCount}</span>
                </div>
                <div className="bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white rounded-full h-3 transition-all duration-500"
                    style={{ width: progressPercent + "%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exercise List */}
        <div className="space-y-3">
          {workout && workout.exercises.map(function(exercise, index) {
            const isCompleted = completedExercises.includes(exercise.id);
            const isExpanded = expandedExercise === exercise.id;
            
            return (
              <Card 
                key={exercise.id} 
                className={`border-0 shadow-md transition-all ${isCompleted ? "bg-emerald-50" : "bg-white"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="pt-1">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={function() { toggleExercise(exercise.id); }}
                        disabled={sessionComplete}
                        className="h-6 w-6"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold ${isCompleted ? "text-emerald-700 line-through" : "text-gray-900"}`}>
                            {exercise.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>{exercise.sets} sets × {exercise.reps}</span>
                            <span className="text-gray-300">•</span>
                            <span className="capitalize">{exercise.muscleGroup}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={function() { toggleDetails(exercise.id); }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-gray-600 text-sm">{exercise.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>~{exercise.duration} min</span>
                          </div>
                          {workout.restBetweenSets && (
                            <p className="text-xs text-gray-500 mt-1">
                              Rest between sets: {workout.restBetweenSets}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Button */}
        {workout && !sessionComplete && completedCount > 0 && completedCount < exerciseCount && (
          <div className="mt-6">
            <Button 
              onClick={completeSession}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-12"
            >
              Finish Early ({completedCount}/{exerciseCount} done)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}