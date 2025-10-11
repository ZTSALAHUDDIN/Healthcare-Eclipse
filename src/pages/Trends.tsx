// Trends Dashboard Screen
// Displays 14-day health trends with charts
// Uses dummy data if no real entries exist

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Moon, Heart, Footprints, Activity } from "lucide-react";

// Generate dummy data for 14 days
const generateDummyData = () => {
  const days = 14;
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sleep: 6 + Math.random() * 3,
      hr: 65 + Math.random() * 15,
      systolic: 110 + Math.random() * 20,
      diastolic: 70 + Math.random() * 15,
      steps: 5000 + Math.random() * 8000,
      mood: 2 + Math.random() * 3,
    });
  }

  return data;
};

const Trends = () => {
  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    // Try to load real data from localStorage
    const entries = JSON.parse(localStorage.getItem("healthEntries") || "[]");
    
    if (entries.length > 0) {
      // Use real data if available
      const processedData = entries.slice(-14).map((entry: any) => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sleep: parseFloat(entry.sleepHours) || 0,
        hr: parseFloat(entry.restingHR) || 0,
        systolic: parseFloat(entry.systolic) || 0,
        diastolic: parseFloat(entry.diastolic) || 0,
        steps: parseFloat(entry.steps) || 0,
        mood: parseFloat(entry.mood) || 0,
      }));
      setTrendData(processedData);
    } else {
      // Use dummy data for demonstration
      setTrendData(generateDummyData());
    }
  }, []);

  // Calculate average for each metric
  const calculateAverage = (metric: string) => {
    if (trendData.length === 0) return "0.0";
    const sum = trendData.reduce((acc, item) => acc + (item[metric] || 0), 0);
    return (sum / trendData.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Health Trends</h1>
          </div>
          <p className="text-primary-foreground/90 text-sm mt-1">
            14-day health metrics overview
          </p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Sleep</p>
                  <p className="text-2xl font-bold">{calculateAverage('sleep')}h</p>
                </div>
                <Moon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg HR</p>
                  <p className="text-2xl font-bold">{calculateAverage('hr')}</p>
                </div>
                <Heart className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Steps</p>
                  <p className="text-2xl font-bold">{(parseFloat(calculateAverage('steps')) / 1000).toFixed(1)}k</p>
                </div>
                <Footprints className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Mood</p>
                  <p className="text-2xl font-bold">{calculateAverage('mood')}/5</p>
                </div>
                <Activity className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sleep Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sleep Hours</CardTitle>
            <CardDescription>Daily sleep duration over the past 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Heart Rate Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Resting Heart Rate</CardTitle>
            <CardDescription>Daily resting heart rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="hr" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--destructive))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blood Pressure Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Pressure</CardTitle>
            <CardDescription>Systolic and diastolic BP trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Steps Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Steps</CardTitle>
            <CardDescription>Physical activity tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mood Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Mood Score</CardTitle>
            <CardDescription>Daily mood tracking (1-5 scale)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis domain={[1, 5]} className="text-xs" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--warning))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
