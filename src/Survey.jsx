import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check, Dumbbell, Target, Calendar, User } from "lucide-react";
import { saveUserProfile } from "@/components/fitness/LocalStorageUtils";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: "",
    weight: "",
    experience: "",
    goal: "",
    workoutDays: []
  });
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;

  // Handle input changes
  function handleInputChange(field, value) {
    setAnswers(function(prev) {
      return { ...prev, [field]: value };
    });
  }

  // Handle workout days toggle
  function handleDayToggle(day) {
    setAnswers(function(prev) {
      const currentDays = prev.workoutDays;
      if (currentDays.includes(day)) {
        return { ...prev, workoutDays: currentDays.filter(function(d) { return d !== day; }) };
      } else {
        return { ...prev, workoutDays: [...currentDays, day] };
      }
    });
  }

  // Navigation
  function goNext() {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile and complete survey
      saveUserProfile(answers);
      setIsComplete(true);
    }
  }

  function goBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  // Check if current step is valid
  function isStepValid() {
    if (currentStep === 1) {
      return answers.age !== "" && answers.weight !== "";
    }
    if (currentStep === 2) {
      return answers.experience !== "";
    }
    if (currentStep === 3) {
      return answers.goal !== "";
    }
    if (currentStep === 4) {
      return answers.workoutDays.length > 0 && answers.workoutDays.length < 7;
    }
    return false;
  }

  // Completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="pt-12 pb-10 px-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">You're All Set!</h1>
            <p className="text-gray-600 mb-8">
              Your personalized workout plan is ready. Let's start your fitness journey today!
            </p>
            <Link to={createPageUrl("Home")}>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-12 text-base">
                Go to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Let's Get Started</h1>
          <p className="text-gray-500 mt-1">Tell us about yourself to personalize your workouts</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
              style={{ width: (currentStep / totalSteps * 100) + "%" }}
            />
          </div>
        </div>

        {/* Survey Card */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 md:p-8">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                    <p className="text-sm text-gray-500">Help us understand you better</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age" className="text-gray-700">How old are you?</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={answers.age}
                      onChange={function(e) { handleInputChange("age", e.target.value); }}
                      className="mt-2 h-12"
                      min="13"
                      max="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-gray-700">Current weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter your weight"
                      value={answers.weight}
                      onChange={function(e) { handleInputChange("weight", e.target.value); }}
                      className="mt-2 h-12"
                      min="50"
                      max="500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Experience */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Fitness Experience</h2>
                    <p className="text-sm text-gray-500">What's your current fitness level?</p>
                  </div>
                </div>

                <RadioGroup
                  value={answers.experience}
                  onValueChange={function(value) { handleInputChange("experience", value); }}
                  className="space-y-3"
                >
                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.experience === "beginner" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Beginner</div>
                      <div className="text-sm text-gray-500">New to working out or less than 1 year</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.experience === "intermediate" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Intermediate</div>
                      <div className="text-sm text-gray-500">1-3 years of consistent training</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.experience === "advanced" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Advanced</div>
                      <div className="text-sm text-gray-500">3+ years of dedicated training</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Goal */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Your Goal</h2>
                    <p className="text-sm text-gray-500">What do you want to achieve?</p>
                  </div>
                </div>

                <RadioGroup
                  value={answers.goal}
                  onValueChange={function(value) { handleInputChange("goal", value); }}
                  className="space-y-3"
                >
                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.goal === "buildMuscle" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="buildMuscle" id="buildMuscle" />
                    <Label htmlFor="buildMuscle" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Build Muscle</div>
                      <div className="text-sm text-gray-500">Gain size and definition</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.goal === "getStronger" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="getStronger" id="getStronger" />
                    <Label htmlFor="getStronger" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Get Stronger</div>
                      <div className="text-sm text-gray-500">Increase strength and power</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.goal === "loseWeight" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="loseWeight" id="loseWeight" />
                    <Label htmlFor="loseWeight" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Lose Weight</div>
                      <div className="text-sm text-gray-500">Burn fat and get lean</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.goal === "recoverFromInjury" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="recoverFromInjury" id="recoverFromInjury" />
                    <Label htmlFor="recoverFromInjury" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">Recover from Injury</div>
                      <div className="text-sm text-gray-500">Gentle rehabilitation focus</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers.goal === "generalFitness" ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <RadioGroupItem value="generalFitness" id="generalFitness" />
                    <Label htmlFor="generalFitness" className="flex-1 cursor-pointer">
                      <div className="font-medium text-gray-900">General Fitness</div>
                      <div className="text-sm text-gray-500">Stay healthy and active</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Workout Days */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Workout Schedule</h2>
                    <p className="text-sm text-gray-500">Which days can you work out?</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(function(day) {
                    const isSelected = answers.workoutDays.includes(day);
                    return (
                      <div
                        key={day}
                        onClick={function() { handleDayToggle(day); }}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"}`}
                      >
                        <Checkbox checked={isSelected} />
                        <span className="font-medium text-gray-700 capitalize">{day}</span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Selected: {answers.workoutDays.length} day{answers.workoutDays.length !== 1 ? "s" : ""} per week
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={currentStep === 1}
                className="text-gray-600"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={goNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                {currentStep === totalSteps ? "Complete" : "Continue"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}