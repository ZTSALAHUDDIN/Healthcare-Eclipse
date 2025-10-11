// Preventive Recommendations Screen
// AI-generated health advice and recommendations
// Mock data for demonstration

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Apple, Dumbbell, Brain, Heart, Users, ChevronRight } from "lucide-react";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  category: 'diet' | 'exercise' | 'stress' | 'medical' | 'lifestyle';
  priority: 'high' | 'medium' | 'low';
  icon: any;
}

// Mock AI-generated recommendations
const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "Mediterranean Diet Adoption",
    description: "Based on your cardiovascular metrics and family history, adopting a Mediterranean diet rich in olive oil, fish, fruits, and vegetables could reduce your risk of heart disease by up to 30%. Focus on: fatty fish 2-3x/week, extra virgin olive oil, whole grains, and leafy greens.",
    category: "diet",
    priority: "high",
    icon: Apple,
  },
  {
    id: 2,
    title: "Progressive Strength Training",
    description: "Your activity data shows primarily cardio-focused exercise. Adding strength training 2-3 times per week can improve bone density, metabolic health, and reduce risk of age-related muscle loss. Start with bodyweight exercises and gradually add resistance.",
    category: "exercise",
    priority: "medium",
    icon: Dumbbell,
  },
  {
    id: 3,
    title: "Mindfulness & Stress Reduction",
    description: "Your mood scores and sleep patterns suggest elevated stress levels. Regular mindfulness practice (10-15 min daily) has been shown to reduce cortisol, improve sleep quality, and enhance emotional regulation. Consider apps like Headspace or Calm.",
    category: "stress",
    priority: "high",
    icon: Brain,
  },
  {
    id: 4,
    title: "Cardiology Consultation Recommended",
    description: "Your blood pressure readings have shown a consistent upward trend. We recommend scheduling a consultation with a cardiologist within the next 2-4 weeks for comprehensive cardiovascular assessment and personalized intervention strategies.",
    category: "medical",
    priority: "high",
    icon: Heart,
  },
  {
    id: 5,
    title: "Sleep Hygiene Optimization",
    description: "Improve your sleep quality by: maintaining consistent sleep/wake times, reducing screen time 1 hour before bed, keeping bedroom temperature at 65-68°F, and avoiding caffeine after 2 PM. These adjustments could add 30-60 minutes of quality sleep.",
    category: "lifestyle",
    priority: "medium",
    icon: Sparkles,
  },
  {
    id: 6,
    title: "Social Connection Enhancement",
    description: "Research shows strong social connections improve longevity and mental health. Aim for meaningful social interactions at least 3-4 times per week. Consider joining a community group, club, or regular meetup aligned with your interests.",
    category: "lifestyle",
    priority: "low",
    icon: Users,
  },
];

const Recommendations = () => {
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'diet':
        return { color: 'bg-accent/10 text-accent', label: 'Nutrition' };
      case 'exercise':
        return { color: 'bg-primary/10 text-primary', label: 'Exercise' };
      case 'stress':
        return { color: 'bg-warning/10 text-warning', label: 'Mental Health' };
      case 'medical':
        return { color: 'bg-destructive/10 text-destructive', label: 'Medical' };
      case 'lifestyle':
        return { color: 'bg-secondary text-secondary-foreground', label: 'Lifestyle' };
      default:
        return { color: 'bg-muted text-muted-foreground', label: 'General' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="default">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const highPriorityCount = mockRecommendations.filter(r => r.priority === 'high').length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-health text-accent-foreground py-6 px-4 shadow-md">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-2xl font-bold">AI Health Recommendations</h1>
          </div>
          <p className="text-accent-foreground/90 text-sm mt-1">
            Personalized preventive care insights powered by your health data
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Summary Banner */}
        {highPriorityCount > 0 && (
          <Card className="mb-6 border-destructive bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">
                    {highPriorityCount} High Priority Recommendation{highPriorityCount > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    These recommendations are based on concerning health patterns and should be
                    addressed promptly with your healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations List */}
        <div className="space-y-4">
          {mockRecommendations.map((rec) => {
            const categoryConfig = getCategoryConfig(rec.category);
            const Icon = rec.icon;

            return (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${categoryConfig.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        {getPriorityBadge(rec.priority)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categoryConfig.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4 leading-relaxed">
                    {rec.description}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">
                      Learn More
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Mark as Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Footer */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">AI-Powered Insights</p>
                <p className="text-sm text-muted-foreground mt-1">
                  These recommendations are generated by analyzing your health data patterns,
                  comparing them with medical research, and identifying opportunities for preventive
                  care. Always consult with healthcare professionals before making significant health
                  changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;
