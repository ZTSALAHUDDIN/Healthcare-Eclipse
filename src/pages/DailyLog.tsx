// Daily Log Screen
// Comprehensive health metrics input form
// Submits to /api/v1/entries (mock for now)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Activity, Droplet, Moon, Heart, Footprints, Apple, Pill, AlertCircle } from "lucide-react";

const DailyLog = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for all health metrics
  const [formData, setFormData] = useState({
    sleepHours: "",
    restingHR: "",
    systolic: "",
    diastolic: "",
    steps: "",
    waterIntake: "",
    mood: "",
    notes: "",
    diet: "",
    medications: "",
    isSmoker: "",
    sugarLevel: "",
    menstrualDay: "",
    isPregnant: "",
  });

  // Quick add buttons for common actions
  const quickAddSteps = (amount: number) => {
    const current = parseInt(formData.steps) || 0;
    setFormData({ ...formData, steps: (current + amount).toString() });
  };

  const quickAddWater = (amount: number) => {
    const current = parseInt(formData.waterIntake) || 0;
    setFormData({ ...formData, waterIntake: (current + amount).toString() });
  };

  // Form submission - would POST to /api/v1/entries
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual backend
      console.log("Submitting health entry:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock API response
      // const response = await fetch('/api/v1/entries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Store in localStorage for demo
      const existingEntries = JSON.parse(localStorage.getItem("healthEntries") || "[]");
      existingEntries.push({
        ...formData,
        date: new Date().toISOString(),
        id: Date.now(),
      });
      localStorage.setItem("healthEntries", JSON.stringify(existingEntries));

      toast.success("Health data logged successfully!", {
        description: "Your daily health metrics have been saved.",
      });

      // Navigate to trends dashboard
      navigate("/trends");
    } catch (error) {
      toast.error("Failed to log health data", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Daily Health Log</h1>
          <p className="text-primary-foreground/90 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sleep & Vitals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Sleep & Vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleep">Sleep Hours</Label>
                  <Input
                    id="sleep"
                    type="number"
                    step="0.5"
                    placeholder="7.5"
                    value={formData.sleepHours}
                    onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr">Resting HR (bpm)</Label>
                  <Input
                    id="hr"
                    type="number"
                    placeholder="72"
                    value={formData.restingHR}
                    onChange={(e) => setFormData({ ...formData, restingHR: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Blood Pressure (mmHg)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Systolic (120)"
                    type="number"
                    value={formData.systolic}
                    onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                  />
                  <Input
                    placeholder="Diastolic (80)"
                    type="number"
                    value={formData.diastolic}
                    onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sugar">Blood Sugar Level (mg/dL)</Label>
                <Input
                  id="sugar"
                  type="number"
                  placeholder="90"
                  value={formData.sugarLevel}
                  onChange={(e) => setFormData({ ...formData, sugarLevel: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Activity Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Footprints className="w-5 h-5 text-primary" />
                Activity & Hydration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="steps">Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  placeholder="10000"
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                />
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => quickAddSteps(1000)}>
                    +1K
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => quickAddSteps(2500)}>
                    +2.5K
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => quickAddSteps(5000)}>
                    +5K
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="water" className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-primary" />
                  Water Intake (glasses)
                </Label>
                <Input
                  id="water"
                  type="number"
                  placeholder="8"
                  value={formData.waterIntake}
                  onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
                />
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => quickAddWater(1)}>
                    +1 Glass
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => quickAddWater(2)}>
                    +2 Glasses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition & Lifestyle Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-primary" />
                Nutrition & Lifestyle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diet">Diet Summary</Label>
                <Textarea
                  id="diet"
                  placeholder="Breakfast: Oats & fruits. Lunch: Grilled chicken salad..."
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Medications Taken</Label>
                <Input
                  id="medications"
                  placeholder="Vitamin D, Omega-3..."
                  value={formData.medications}
                  onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smoker">Smoker Status</Label>
                <Select
                  value={formData.isSmoker}
                  onValueChange={(value) => setFormData({ ...formData, isSmoker: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="former">Former Smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Women's Health Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Women's Health (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="menstrual">Menstrual Cycle Day</Label>
                <Input
                  id="menstrual"
                  type="number"
                  placeholder="1-28"
                  value={formData.menstrualDay}
                  onChange={(e) => setFormData({ ...formData, menstrualDay: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pregnant">Pregnancy Status</Label>
                <Select
                  value={formData.isPregnant}
                  onValueChange={(value) => setFormData({ ...formData, isPregnant: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Not Pregnant</SelectItem>
                    <SelectItem value="yes">Pregnant</SelectItem>
                    <SelectItem value="trying">Trying to Conceive</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Mood & Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Mood & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mood">Overall Mood (1-5)</Label>
                <Select
                  value={formData.mood}
                  onValueChange={(value) => setFormData({ ...formData, mood: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">😢 Very Poor</SelectItem>
                    <SelectItem value="2">😕 Poor</SelectItem>
                    <SelectItem value="3">😐 Neutral</SelectItem>
                    <SelectItem value="4">🙂 Good</SelectItem>
                    <SelectItem value="5">😄 Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any symptoms, feelings, or observations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Log Health Data"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DailyLog;
