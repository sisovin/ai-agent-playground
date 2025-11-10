'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SettingsService } from "@/lib/settings-service";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { UserSettings, Theme, Language, defaultSettings } from "@/lib/settings-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings, 
  User, 
  Palette, 
  Bell, 
  Shield, 
  HelpCircle,
  Save,
  Loader2,
  ArrowLeft,
  Globe,
  Sparkles,
  Zap,
  Eye,
  Award,
  Mail,
  Smartphone
} from "lucide-react";

export default function SettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured) {
        // Use local defaults if Supabase not configured
        setSettings({ userId: user.id, ...defaultSettings });
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. Using local settings.",
          variant: "default"
        });
        return;
      }

      let userSettings = await SettingsService.getUserSettings(user.id);
      
      if (!userSettings) {
        // Initialize with defaults
        userSettings = await SettingsService.initializeUserSettings(user.id);
      }
      
      setSettings(userSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings. Using defaults.",
        variant: "destructive"
      });
      setSettings({ userId: user.id, ...defaultSettings });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings || !user) return;
    
    if (!isSupabaseConfigured) {
      toast({
        title: "Demo Mode",
        description: "Supabase not configured. Settings saved locally only.",
        variant: "default"
      });
      return;
    }

    setIsSaving(true);
    try {
      const success = await SettingsService.saveUserSettings(settings);
      
      if (success) {
        toast({
          title: "Success",
          description: "Your settings have been saved.",
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!user || !settings) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
                  <Settings className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Settings</h1>
                  <p className="text-sm text-muted-foreground">Manage your preferences</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Account Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Account
            </CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className="mt-2 bg-yellow-400 text-gray-900">Premium Member</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
              <Select 
                value={settings.theme} 
                onValueChange={(value) => updateSetting('theme', value as Theme)}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Theme.LIGHT}>Light</SelectItem>
                  <SelectItem value={Theme.DARK}>Dark</SelectItem>
                  <SelectItem value={Theme.SYSTEM}>System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </Label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => updateSetting('language', value as Language)}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Language.ENGLISH}>English</SelectItem>
                  <SelectItem value={Language.SPANISH}>Español</SelectItem>
                  <SelectItem value={Language.FRENCH}>Français</SelectItem>
                  <SelectItem value={Language.GERMAN}>Deutsch</SelectItem>
                  <SelectItem value={Language.CHINESE}>中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI Configuration
            </CardTitle>
            <CardDescription>Customize AI agent behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aiModel" className="text-base font-medium">AI Model</Label>
              <Select 
                value={settings.aiModel} 
                onValueChange={(value) => updateSetting('aiModel', value)}
              >
                <SelectTrigger id="aiModel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama2">Llama 2</SelectItem>
                  <SelectItem value="mistral">Mistral</SelectItem>
                  <SelectItem value="codellama">Code Llama</SelectItem>
                  <SelectItem value="phi">Phi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="text-base font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Temperature
                </Label>
                <span className="text-sm font-mono text-muted-foreground">
                  {settings.aiTemperature.toFixed(1)}
                </span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[settings.aiTemperature]}
                onValueChange={(value) => updateSetting('aiTemperature', value[0])}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Controls randomness: 0 is focused, 2 is creative
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxTokens" className="text-base font-medium">Max Tokens</Label>
                <span className="text-sm font-mono text-muted-foreground">
                  {settings.aiMaxTokens}
                </span>
              </div>
              <Slider
                id="maxTokens"
                min={256}
                max={4096}
                step={256}
                value={[settings.aiMaxTokens]}
                onValueChange={(value) => updateSetting('aiMaxTokens', value[0])}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Maximum length of AI responses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-500" />
              Notifications
            </CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="emailNotifications" className="text-base font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive course updates and progress reports
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="pushNotifications" className="text-base font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get instant alerts on your device
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="marketingEmails" className="text-base font-medium">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive news about new courses and features
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning Preferences Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-500" />
              Learning Preferences
            </CardTitle>
            <CardDescription>Customize your learning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="autoSave" className="text-base font-medium">Auto-Save Progress</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your course progress
                </p>
              </div>
              <Switch
                id="autoSave"
                checked={settings.autoSaveProgress}
                onCheckedChange={(checked) => updateSetting('autoSaveProgress', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="badges" className="text-base font-medium">Show Completion Badges</Label>
                <p className="text-sm text-muted-foreground">
                  Display achievement badges on your profile
                </p>
              </div>
              <Switch
                id="badges"
                checked={settings.showCompletionBadges}
                onCheckedChange={(checked) => updateSetting('showCompletionBadges', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="privacyMode" className="text-base font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Privacy Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Hide your profile and progress from other users
                </p>
              </div>
              <Switch
                id="privacyMode"
                checked={settings.privacyMode}
                onCheckedChange={(checked) => updateSetting('privacyMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-500" />
              Support
            </CardTitle>
            <CardDescription>Get help and manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
            <Separator />
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Last Updated */}
        {settings.updatedAt && (
          <p className="text-center text-sm text-muted-foreground mb-8">
            Last updated: {new Date(settings.updatedAt).toLocaleString()}
          </p>
        )}
      </main>
    </div>
  );
}