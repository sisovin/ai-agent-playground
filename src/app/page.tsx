'use client';

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CourseCard from "@/components/course-card";
import AgentPlayground from "@/components/agent-playground";
import { agentCourses, AgentCourse } from "@/lib/agent-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Target, 
  Users, 
  Code, 
  Brain, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  TrendingUp
} from "lucide-react";

export default function Page() {
  const [selectedCourse, setSelectedCourse] = useState<AgentCourse | null>(null);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  const handleCardClick = (course: AgentCourse) => {
    setSelectedCourse(course);
    setPlaygroundOpen(true);
  };

  const features = [
    {
      icon: Brain,
      title: "Interactive Learning",
      description: "Learn by doing with real AI models powered by Ollama. No theory-only courses."
    },
    {
      icon: Code,
      title: "Hands-On Playground",
      description: "Experiment with different AI agents in a safe, interactive environment."
    },
    {
      icon: Zap,
      title: "Real-Time Feedback",
      description: "Get instant responses and see your agents in action immediately."
    },
    {
      icon: Target,
      title: "Practical Skills",
      description: "Build production-ready skills with industry-standard tools and frameworks."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from the creators of leading AI agent frameworks."
    },
    {
      icon: Rocket,
      title: "Career Ready",
      description: "Master the skills companies are actively hiring for right now."
    }
  ];

  const stats = [
    { value: "9", label: "Expert Courses", icon: Star },
    { value: "50+", label: "Hours Content", icon: Play },
    { value: "10k+", label: "Students", icon: Users },
    { value: "95%", label: "Success Rate", icon: TrendingUp }
  ];

  const benefits = [
    "Access to all 9 AI agent courses",
    "Interactive Ollama-powered playground",
    "Real-world project templates",
    "Community support & discussions",
    "Certificate of completion",
    "Lifetime access to materials"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 py-20 px-4 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gray-900 text-yellow-400 hover:bg-gray-800 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              The Future of AI Learning
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master AI Agents with
              <span className="block text-gray-800">Hands-On Learning</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build, experiment, and deploy intelligent AI agents using real tools. Learn from industry experts with interactive playgrounds powered by Ollama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gray-900 text-yellow-400 hover:bg-gray-800 text-lg px-8 py-6 h-auto"
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-yellow-400 text-lg px-8 py-6 h-auto"
              >
                Watch Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-400 text-gray-900">Features</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become an AI agent expert, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 lg:py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-400 text-gray-900">Courses</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore AI Agent Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click any course card to open the interactive playground and start learning with real AI models
            </p>
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
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-400 text-gray-900">What You Get</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students mastering AI agents with our comprehensive platform. Get instant access to all courses and features.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 text-lg px-8 py-6 h-auto">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <Card className="border-2 border-yellow-400 shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-yellow-400 to-orange-400 text-gray-900">
                  <CardTitle className="text-2xl">Premium Access</CardTitle>
                  <CardDescription className="text-gray-800 text-lg">
                    Unlock your AI agent potential
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-foreground mb-2">Free</div>
                    <div className="text-muted-foreground">During Beta</div>
                  </div>
                  <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 text-lg py-6 h-auto">
                    Start Learning Today
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    No credit card required • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Build Your First AI Agent?
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join our community of learners and start your journey into the world of AI agents today.
          </p>
          <Button 
            size="lg" 
            className="bg-gray-900 text-yellow-400 hover:bg-gray-800 text-lg px-8 py-6 h-auto"
            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Courses
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />

      <AgentPlayground
        course={selectedCourse}
        open={playgroundOpen}
        onOpenChange={setPlaygroundOpen}
      />
    </div>
  );
}