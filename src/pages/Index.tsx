// Home / Dashboard Screen
// Welcome screen with quick stats and navigation

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, TrendingUp, Sparkles, Calendar } from "lucide-react";
// import heroHealth from "@/assets/hero-health.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({
    entriesCount: 0,
    lastEntry: null as Date | null,
  });

  useEffect(() => {
    // Check if user has completed onboarding
    const user = localStorage.getItem("healthEclipseUser");
    if (!user) {
      navigate("/onboarding");
      return;
    }

    setUserData(JSON.parse(user));

    // Load stats
    const entries = JSON.parse(localStorage.getItem("healthEntries") || "[]");
    setStats({
      entriesCount: entries.length,
      lastEntry: entries.length > 0 ? new Date(entries[entries.length - 1].date) : null,
    });
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-56 overflow-hidden">
        {/* <img 
          src={heroHealth} 
          alt="Healthcare Eclipse" 
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-primary-foreground drop-shadow-lg">
            {getGreeting()}, {userData.name.split(' ')[0]}!
          </h1>
          <p className="text-primary-foreground/90 drop-shadow">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 -mt-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-3xl font-bold text-primary">{stats.entriesCount}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Entry</p>
                  <p className="text-sm font-semibold">
                    {stats.lastEntry 
                      ? stats.lastEntry.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : "No entries yet"
                    }
                  </p>
                </div>
                <Activity className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start h-14"
              size="lg"
              onClick={() => navigate("/daily-log")}
            >
              <Activity className="w-5 h-5 mr-3" />
              Log Today's Health Data
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14"
              size="lg"
              onClick={() => navigate("/trends")}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              View Health Trends
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-14"
              size="lg"
              onClick={() => navigate("/recommendations")}
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Get AI Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Health Insights */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              Your Health Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Healthcare Eclipse uses advanced AI to analyze your health patterns and provide
              personalized insights. Log your daily metrics consistently to unlock detailed trends,
              early risk detection, and preventive care recommendations tailored specifically for you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
