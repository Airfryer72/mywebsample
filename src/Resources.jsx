import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Utensils,
  Clock,
  ExternalLink,
  Dumbbell

} from "lucide-react";
import { getUserProfile, hasCompletedSurvey } from "@/components/fitness/LocalStorageUtils";
import { getResourcesForGoal } from "@/components/fitness/ResourceData";

export default function Resources() {
  const [resources, setResources] = useState(null);
  const [surveyDone, setSurveyDone] = useState(false);
  const [userGoal, setUserGoal] = useState("");

  useEffect(function() {
    const completed = hasCompletedSurvey();
    setSurveyDone(completed);
    
    if (completed) {
      const profile = getUserProfile();
      setUserGoal(profile.goal || "generalFitness");
      const goalResources = getResourcesForGoal(profile.goal);
      setResources(goalResources);
    }
  }, []);

  // Format goal name for display
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

  // Redirect if survey not done
  if (!surveyDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">Take our quick survey to get personalized resources.</p>
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

  if (!resources) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-gray-500">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link to={createPageUrl("Home")} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Resource Guide</h1>
          <p className="text-gray-500 mt-1">Curated content for your goal: <span className="text-emerald-600 font-medium">{formatGoal(userGoal)}</span></p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="bg-white shadow-md p-1 h-auto rounded-xl">
            <TabsTrigger 
              value="articles" 
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white px-4 py-2 rounded-lg"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger 
              value="videos"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white px-4 py-2 rounded-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="mealplan"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white px-4 py-2 rounded-lg"
            >
              <Utensils className="w-4 h-4 mr-2" />
              Meal Plan
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-4">
            {resources.articles.map(function(article) {
              return (
                <Card key={article.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{article.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                      </div>
                      <Button onClick={() => window.open(article.url, '_blank')} variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-600">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.videos.map(function(video) {
                return (
                  <Card key={video.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-32 flex items-center justify-center relative">
                      <span className="text-4xl">{video.thumbnail}</span>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-800 ml-1" onClick={() => window.open(video.url, '_blank')} />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Meal Plan Tab */}
          <TabsContent value="mealplan">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{resources.mealPlan.title}</h2>
                    <p className="text-gray-500 text-sm">{resources.mealPlan.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {resources.mealPlan.meals.map(function(meal, index) {
                    return (
                      <div key={index} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{meal.meal}</h4>
                            <p className="text-gray-600 mt-1">{meal.suggestion}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-900 font-medium">{meal.calories} cal</p>
                            <p className="text-gray-500">{meal.protein} protein</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h4 className="font-semibold text-emerald-900 mb-2">Daily Totals</h4>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">{resources.mealPlan.dailyTotal.calories}</p>
                        <p className="text-sm text-emerald-700">calories</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">{resources.mealPlan.dailyTotal.protein}</p>
                        <p className="text-sm text-emerald-700">protein</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}