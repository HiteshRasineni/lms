import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, FileText, CheckCircle, Plus } from "lucide-react";

const TeacherDashboard = () => {
  const myCourses = [
    { id: 1, name: "Introduction to Computer Science", students: 45, assignments: 8, nextClass: "Mon 10:00 AM" },
    { id: 2, name: "Advanced Web Development", students: 32, assignments: 6, nextClass: "Wed 2:00 PM" },
  ];

  const pendingGrading = [
    { id: 1, assignment: "Final Project", course: "Computer Science", submissions: 12, total: 45 },
    { id: 2, assignment: "React Assignment", course: "Web Development", submissions: 8, total: 32 },
  ];

  const recentActivity = [
    { id: 1, student: "John Doe", action: "submitted", assignment: "Algorithm Project", time: "2 hours ago" },
    { id: 2, student: "Jane Smith", action: "submitted", assignment: "React Component", time: "4 hours ago" },
    { id: 3, student: "Mike Johnson", action: "asked question in", assignment: "Forum Discussion", time: "1 day ago" },
  ];

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and student progress.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Course
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">77</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-warning">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Graded This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-success">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Courses you're currently teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {course.assignments} assignments
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline">{course.nextClass}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Course</Button>
                    <Button size="sm" variant="outline">Manage Content</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Grading */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Grading</CardTitle>
              <CardDescription>Assignments waiting for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingGrading.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-sm">{item.assignment}</h4>
                      <p className="text-xs text-muted-foreground">{item.course}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(item.submissions / item.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.submissions}/{item.total}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">Grade</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest student interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.student}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.assignment}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
