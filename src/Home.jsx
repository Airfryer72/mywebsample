import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  BookOpen, 
  Settings, 
  Flame, 
  Calendar, 
  Target,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";
import { 
  getUserProfile, 
  hasCompletedSurvey, 
  getStreak,
  getTodayProgress 
} from "@/components/fitness/LocalStorageUtils";
import { generateWorkout } from "@/components/fitness/WorkoutData";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [surveyDone, setSurveyDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [todayProgress, setTodayProgress] = useState({ completedExercises: [], sessionComplete: false });

  useEffect(function() {
    const completed = hasCompletedSurvey();
    setSurveyDone(completed);
    
    if (completed) {
      const userProfile = getUserProfile();
      setProfile(userProfile);
      
      const streakData = getStreak();
      setStreak(streakData.count);
      
      const workout = generateWorkout(userProfile);
      setTodayWorkout(workout);
      
      const progress = getTodayProgress();
      setTodayProgress(progress);
    }
  }, []);

  // Show welcome screen if survey not completed
  if (!surveyDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to FitLife</h1>
          <p className="text-gray-600 mb-8">
            Your personalized fitness companion. Let's start by learning a bit about you to create your perfect workout plan.
          </p>
          <Link to={createPageUrl("Survey")}>
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-12 text-base shadow-lg">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format goal for display
  function formatGoal(goal) {
    const goalNames = {
      buildMuscle: "Build Muscle",
      getStronger: "Get Stronger",
      loseWeight: "Lose Weight",
      recoverFromInjury: "Recovery",
      generalFitness: "General Fitness"
    };
    return goalNames[goal] || "General Fitness";
  }

  // Get day name
  function getDayName() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  }

  // Calculate workout progress
  const exerciseCount = todayWorkout ? todayWorkout.exercises.length : 0;
  const completedCount = todayProgress.completedExercises.length;
  const progressPercent = exerciseCount > 0 ? Math.round((completedCount / exerciseCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}!
          </h1>
          <p className="text-gray-500 mt-1">Here's your fitness overview for {getDayName()}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{streak}</p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{formatGoal(profile?.goal)}</p>
                  <p className="text-xs text-gray-500">Your Goal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{profile?.workoutDays?.length || 0}</p>
                  <p className="text-xs text-gray-500">Days/Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{progressPercent}%</p>
                  <p className="text-xs text-gray-500">Today Done</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Workout Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Today's Workout</p>
                {todayWorkout && !todayWorkout.isRestDay ? (
                  <>
                    <h2 className="text-xl font-bold mt-1 capitalize">
                      {todayWorkout.muscleGroups.join(" & ")}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-emerald-100">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        {todayWorkout.exercises.length} exercises
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ~{todayWorkout.totalDuration} min
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mt-1">Rest Day</h2>
                    <p className="text-emerald-100 mt-2">Recovery is key to progress!</p>
                  </>
                )}
              </div>
              {todayProgress.sessionComplete && (
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  Completed ✓
                </div>
              )}
            </div>

            {todayWorkout && !todayWorkout.isRestDay && (
              <>
                <div className="bg-white/20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: progressPercent + "%" }}
                  />
                </div>

                <Link to={createPageUrl("TodaysWorkout")}>
                  <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 h-11">
                    {completedCount > 0 ? "Continue Workout" : "Start Workout"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to={createPageUrl("TodaysWorkout")}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Today's Workout</h3>
                  <p className="text-sm text-gray-500">View exercises</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Resources")}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Resource Guide</h3>
                  <p className="text-sm text-gray-500">Articles & meal plans</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Settings")}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Settings</h3>
                  <p className="text-sm text-gray-500">Update your profile</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}