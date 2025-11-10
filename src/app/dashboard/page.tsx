'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/course-card";
import AgentPlayground from "@/components/agent-playground";
import { agentCourses, AgentCourse } from "@/lib/agent-data";
import { 
  Sparkles, 
  LogOut, 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Play,
  CheckCircle2,
  Loader2,
  Settings
} from "lucide-react";

export default function DashboardPage() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<AgentCourse | null>(null);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [user, isLoading, router]);

  const handleCardClick = (course: AgentCourse) => {
    setSelectedCourse(course);
    setPlaygroundOpen(true);
  };

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { label: "Courses Enrolled", value: "9", icon: BookOpen, color: "text-blue-500" },
    { label: "Hours Learned", value: "12", icon: Clock, color: "text-green-500" },
    { label: "Completed", value: "3", icon: CheckCircle2, color: "text-yellow-500" },
    { label: "Achievements", value: "5", icon: Trophy, color: "text-purple-500" }
  ];

  const recentActivity = [
    { course: "CrewAI Multi-Agent", progress: 75, lastAccessed: "2 hours ago" },
    { course: "LangGraph Workflows", progress: 45, lastAccessed: "1 day ago" },
    { course: "RAG Systems", progress: 30, lastAccessed: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
                <Sparkles className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Agent Playground</h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/settings')}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Continue your AI learning journey and master new agent frameworks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-500" />
              Continue Learning
            </CardTitle>
            <CardDescription>
              Pick up where you left off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{activity.course}</h4>
                      <span className="text-sm text-muted-foreground">{activity.lastAccessed}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={activity.progress} className="flex-1" />
                      <span className="text-sm font-medium text-foreground">{activity.progress}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">All Courses</h3>
              <p className="text-muted-foreground">
                Explore and learn from {agentCourses.length} expert-led courses
              </p>
            </div>
            <Badge className="bg-yellow-400 text-gray-900">
              {agentCourses.length} Available
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCardClick(course)}
              />
            ))}
          </div>
        </div>
      </main>

      <AgentPlayground
        course={selectedCourse}
        open={playgroundOpen}
        onOpenChange={setPlaygroundOpen}
      />
    </div>
  );
}