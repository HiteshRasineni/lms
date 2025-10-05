import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Users, Star } from "lucide-react";

const CourseList = () => {
  const availableCourses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      instructor: "Dr. Smith",
      description: "Learn the fundamentals of programming and computer science concepts.",
      students: 45,
      duration: "12 weeks",
      rating: 4.8,
      enrolled: true,
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      instructor: "Prof. Johnson",
      description: "Master essential data structures and algorithmic problem-solving techniques.",
      students: 32,
      duration: "14 weeks",
      rating: 4.9,
      enrolled: true,
    },
    {
      id: 3,
      name: "Web Development Fundamentals",
      instructor: "Ms. Williams",
      description: "Build modern web applications with HTML, CSS, JavaScript, and React.",
      students: 38,
      duration: "10 weeks",
      rating: 4.7,
      enrolled: true,
    },
    {
      id: 4,
      name: "Machine Learning Basics",
      instructor: "Dr. Brown",
      description: "Introduction to machine learning algorithms and practical applications.",
      students: 28,
      duration: "16 weeks",
      rating: 4.6,
      enrolled: false,
    },
    {
      id: 5,
      name: "Mobile App Development",
      instructor: "Mr. Davis",
      description: "Create native mobile applications for iOS and Android platforms.",
      students: 25,
      duration: "12 weeks",
      rating: 4.5,
      enrolled: false,
    },
    {
      id: 6,
      name: "Database Management Systems",
      instructor: "Prof. Martinez",
      description: "Learn SQL, database design, and modern database technologies.",
      students: 30,
      duration: "10 weeks",
      rating: 4.7,
      enrolled: false,
    },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Course Catalog</h1>
          <p className="text-muted-foreground">Explore and enroll in available courses.</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses by name, instructor, or topic..." 
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Enrolled Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.filter(c => c.enrolled).map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <Badge>Enrolled</Badge>
                  </div>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full">Continue Learning</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.filter(c => !c.enrolled).map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseList;