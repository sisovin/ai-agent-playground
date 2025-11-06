import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { AgentCourse } from "@/lib/agent-data";

interface CourseCardProps {
  course: AgentCourse;
  onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-gray-900 border-2 hover:border-yellow-400"
      onClick={onClick}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {course.id}
          </Badge>
          <span className="text-4xl">{course.icon}</span>
        </div>
        <CardTitle className="text-xl font-bold leading-tight">
          {course.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {course.provider}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-yellow-400 text-gray-900 text-xs font-semibold">
              {course.instructor.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{course.instructor}</span>
        </div>
      </CardContent>
    </Card>
  );
}