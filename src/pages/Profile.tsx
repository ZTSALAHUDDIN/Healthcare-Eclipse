// Profile Screen
// User settings and preferences
// Includes doctor sharing, data export, family history, etc.

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Download, Share2, FileText, Globe, Briefcase } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    doctorSharing: false,
    familyHistory: "",
    country: "",
    employmentType: "",
  });

  useEffect(() => {
    // Load user data from localStorage
    const user = JSON.parse(localStorage.getItem("healthEclipseUser") || "{}");
    setUserData(user);

    // Load profile preferences
    const savedProfile = JSON.parse(localStorage.getItem("healthProfile") || "{}");
    setProfileData({
      doctorSharing: savedProfile.doctorSharing || false,
      familyHistory: savedProfile.familyHistory || "",
      country: savedProfile.country || "",
      employmentType: savedProfile.employmentType || "",
    });
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("healthProfile", JSON.stringify(profileData));
    toast.success("Profile updated successfully!");
  };

  const handleExportData = () => {
    // Export all health data as JSON
    const entries = localStorage.getItem("healthEntries") || "[]";
    const user = localStorage.getItem("healthEclipseUser") || "{}";
    const profile = localStorage.getItem("healthProfile") || "{}";

    const exportData = {
      user: JSON.parse(user),
      profile: JSON.parse(profile),
      entries: JSON.parse(entries),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthcare-eclipse-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Health data exported successfully!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Profile & Settings</h1>
          </div>
          <p className="text-primary-foreground/90 text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details from onboarding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData && (
              <>
                <div>
                  <Label className="text-muted-foreground text-sm">Name</Label>
                  <p className="text-lg font-medium">{userData.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Age</Label>
                    <p className="text-lg font-medium">{userData.age} years</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Gender</Label>
                    <p className="text-lg font-medium capitalize">{userData.gender}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Doctor Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Healthcare Provider Access
            </CardTitle>
            <CardDescription>
              Allow your healthcare providers to access your health data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share data with doctors</p>
                <p className="text-sm text-muted-foreground">
                  Enable secure sharing of your health metrics
                </p>
              </div>
              <Switch
                checked={profileData.doctorSharing}
                onCheckedChange={(checked) =>
                  setProfileData({ ...profileData, doctorSharing: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Family History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Family Medical History
            </CardTitle>
            <CardDescription>
              Important information for risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any family history of chronic diseases, conditions, or health concerns..."
              value={profileData.familyHistory}
              onChange={(e) =>
                setProfileData({ ...profileData, familyHistory: e.target.value })
              }
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
            <CardDescription>
              Additional information for personalized insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Country
              </Label>
              <Select
                value={profileData.country}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, country: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employment" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Employment Type
              </Label>
              <Select
                value={profileData.employmentType}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, employmentType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Data Export
            </CardTitle>
            <CardDescription>
              Download all your health data in JSON format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportData} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export All Health Data
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSaveProfile} className="w-full" size="lg">
          Save Profile Settings
        </Button>
      </div>
    </div>
  );
};

export default Profile;
