// Alerts Screen
// Displays AI-generated health risk alerts
// Mock data for demonstration - would fetch from /api/v1/alerts

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, ExternalLink } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  date: string;
  reportUrl: string;
}

// Mock AI-generated alerts
const mockAlerts: Alert[] = [
  {
    id: 1,
    title: "Elevated Blood Pressure Pattern",
    description: "Your systolic blood pressure has been above 130 mmHg for 3 consecutive days. Consider reducing sodium intake and monitoring stress levels.",
    priority: "high",
    category: "Cardiovascular",
    date: new Date().toISOString(),
    reportUrl: "/reports/bp-analysis",
  },
  {
    id: 2,
    title: "Sleep Deficit Detected",
    description: "You've averaged 5.5 hours of sleep over the past week, which is below the recommended 7-9 hours. This may impact your cognitive function and immune system.",
    priority: "medium",
    category: "Sleep Health",
    date: new Date(Date.now() - 86400000).toISOString(),
    reportUrl: "/reports/sleep-analysis",
  },
  {
    id: 3,
    title: "Low Daily Step Count",
    description: "Your average daily steps (4,200) is below the recommended 8,000-10,000 steps. Increasing physical activity can improve cardiovascular health.",
    priority: "medium",
    category: "Physical Activity",
    date: new Date(Date.now() - 172800000).toISOString(),
    reportUrl: "/reports/activity-analysis",
  },
  {
    id: 4,
    title: "Hydration Goal Achievement",
    description: "Great job! You've met your daily hydration goals for 7 consecutive days. Keep up the excellent work!",
    priority: "low",
    category: "Nutrition",
    date: new Date(Date.now() - 259200000).toISOString(),
    reportUrl: "/reports/hydration-report",
  },
  {
    id: 5,
    title: "Blood Sugar Fluctuation",
    description: "Your blood sugar readings show higher variability than usual. Consider maintaining consistent meal times and monitoring carbohydrate intake.",
    priority: "high",
    category: "Metabolic Health",
    date: new Date(Date.now() - 345600000).toISOString(),
    reportUrl: "/reports/glucose-analysis",
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch alerts
    // fetch('/api/v1/alerts').then(res => res.json()).then(setAlerts)
    
    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  }, []);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          badge: 'destructive',
          color: 'text-destructive',
        };
      case 'medium':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          badge: 'default',
          color: 'text-warning',
        };
      case 'low':
        return {
          icon: <Info className="w-5 h-5" />,
          badge: 'secondary',
          color: 'text-accent',
        };
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          badge: 'secondary',
          color: 'text-muted-foreground',
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading health alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Health Alerts</h1>
          </div>
          <p className="text-primary-foreground/90 text-sm mt-1">
            AI-generated insights and recommendations based on your health data
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-destructive">
                {alerts.filter(a => a.priority === 'high').length}
              </p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-warning">
                {alerts.filter(a => a.priority === 'medium').length}
              </p>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-accent">
                {alerts.filter(a => a.priority === 'low').length}
              </p>
              <p className="text-sm text-muted-foreground">Low Priority</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const config = getPriorityConfig(alert.priority);
            
            return (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={config.color}>
                        {config.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <Badge variant={config.badge as any}>
                            {alert.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          {alert.category} • {formatDate(alert.date)}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4">
                    {alert.description}
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    View Detailed Report
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {alerts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">No alerts at this time</p>
              <p className="text-muted-foreground text-sm">
                Keep logging your daily health data to receive personalized insights
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Alerts;
