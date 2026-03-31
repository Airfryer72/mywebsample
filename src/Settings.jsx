import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  User, 
  Target, 
  Calendar,
  Dumbbell,
  AlertCircle
} from "lucide-react";
import { 
  getUserProfile, 
  saveUserProfile, 
  clearAllData,
  hasCompletedSurvey
} from "@/components/fitness/LocalStorageUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    experience: "",
    goal: "",
    workoutDays: []
  });
  const [saved, setSaved] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);

  useEffect(function() {
    const completed = hasCompletedSurvey();
    setSurveyDone(completed);
    
    if (completed) {
      const userProfile = getUserProfile();
      setProfile(userProfile);
    }
  }, []);

  // Handle input changes
  function handleChange(field, value) {
    setProfile(function(prev) {
      return { ...prev, [field]: value };
    });
    setSaved(false);
  }

  // Handle workout days toggle
  function handleDayToggle(day) {
    setProfile(function(prev) {
      const currentDays = prev.workoutDays || [];
      if (currentDays.includes(day)) {
        return { ...prev, workoutDays: currentDays.filter(function(d) { return d !== day; }) };
      } else {
        return { ...prev, workoutDays: [...currentDays, day] };
      }
    });
    setSaved(false);
  }

  // Save profile
  function handleSave() {
    saveUserProfile(profile);
    setSaved(true);
    setTimeout(function() {
      setSaved(false);
    }, 3000);
  }

  // Reset all data
  function handleReset() {
    clearAllData();
    window.location.href = createPageUrl("Survey");
  }

  // Redirect if survey not done
  if (!surveyDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Profile Yet</h2>
            <p className="text-gray-600 mb-6">Complete the survey first to set up your profile.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Update your profile and preferences</p>
        </div>

        {/* Saved notification */}
        {saved && (
          <div className="mb-6 bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <Save className="w-4 h-4" />
            Your changes have been saved!
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ""}
                    onChange={function(e) { handleChange("age", e.target.value); }}
                    className="mt-1"
                    min="13"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight || ""}
                    onChange={function(e) { handleChange("weight", e.target.value); }}
                    className="mt-1"
                    min="50"
                    max="500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-teal-600" />
                </div>
                Fitness Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={profile.experience || ""}
                onValueChange={function(value) { handleChange("experience", value); }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="beginner" id="set-beginner" />
                  <Label htmlFor="set-beginner" className="cursor-pointer">
                    <span className="font-medium">Beginner</span>
                    <span className="text-gray-500 text-sm ml-2">Less than 1 year</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="intermediate" id="set-intermediate" />
                  <Label htmlFor="set-intermediate" className="cursor-pointer">
                    <span className="font-medium">Intermediate</span>
                    <span className="text-gray-500 text-sm ml-2">1-3 years</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="advanced" id="set-advanced" />
                  <Label htmlFor="set-advanced" className="cursor-pointer">
                    <span className="font-medium">Advanced</span>
                    <span className="text-gray-500 text-sm ml-2">3+ years</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Goal */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                Your Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={profile.goal || ""}
                onValueChange={function(value) { handleChange("goal", value); }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="buildMuscle" id="set-buildMuscle" />
                  <Label htmlFor="set-buildMuscle" className="cursor-pointer font-medium">Build Muscle</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="getStronger" id="set-getStronger" />
                  <Label htmlFor="set-getStronger" className="cursor-pointer font-medium">Get Stronger</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="loseWeight" id="set-loseWeight" />
                  <Label htmlFor="set-loseWeight" className="cursor-pointer font-medium">Lose Weight</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="recoverFromInjury" id="set-recoverFromInjury" />
                  <Label htmlFor="set-recoverFromInjury" className="cursor-pointer font-medium">Recover from Injury</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="generalFitness" id="set-generalFitness" />
                  <Label htmlFor="set-generalFitness" className="cursor-pointer font-medium">General Fitness</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Workout Days */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                Workout Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(function(day) {
                  const isSelected = (profile.workoutDays || []).includes(day);
                  return (
                    <div
                      key={day}
                      onClick={function() { handleDayToggle(day); }}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${isSelected ? "bg-emerald-100 border-emerald-300" : "bg-gray-50 hover:bg-gray-100"} border`}
                    >
                      <Checkbox checked={isSelected} />
                      <span className={`text-sm font-medium capitalize ${isSelected ? "text-emerald-700" : "text-gray-600"}`}>
                        {day.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              onClick={handleSave}
              disabled={profile.workoutDays.length === 0}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-12"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 h-12">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Reset All Data?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete your profile, workout progress, and streak. You'll need to complete the survey again. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleReset}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}