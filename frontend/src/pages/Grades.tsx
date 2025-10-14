import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Award, FileText } from "lucide-react";

const Grades = () => {
  const courses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      currentGrade: 92,
      letterGrade: "A",
      assignments: [
        { name: "Midterm Exam", score: 92, maxScore: 100, weight: "30%", feedback: "Excellent understanding of core concepts!" },
        { name: "Programming Assignment 1", score: 95, maxScore: 100, weight: "20%", feedback: "Well-structured code with good documentation." },
        { name: "Quiz 1", score: 88, maxScore: 100, weight: "10%", feedback: "Good work. Review exception handling." },
        { name: "Quiz 2", score: 90, maxScore: 100, weight: "10%", feedback: "Great improvement!" },
      ],
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      currentGrade: 88,
      letterGrade: "B+",
      assignments: [
        { name: "Sorting Algorithms Quiz", score: 88, maxScore: 100, weight: "15%", feedback: "Good understanding of algorithm complexity." },
        { name: "Binary Tree Implementation", score: 92, maxScore: 100, weight: "25%", feedback: "Excellent implementation!" },
        { name: "Graph Algorithms Project", score: 85, maxScore: 100, weight: "30%", feedback: "Consider edge cases in your solution." },
      ],
    },
    {
      id: 3,
      name: "Web Development Fundamentals",
      currentGrade: 95,
      letterGrade: "A",
      assignments: [
        { name: "HTML/CSS Project", score: 95, maxScore: 100, weight: "20%", feedback: "Beautiful and responsive design!" },
        { name: "JavaScript Quiz", score: 98, maxScore: 100, weight: "15%", feedback: "Perfect understanding of JS concepts." },
        { name: "React Component Assignment", score: 94, maxScore: 100, weight: "25%", feedback: "Clean component architecture." },
      ],
    },
  ];

  const overallGPA = 3.83;
  const selectedCourse = courses[0];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Grades & Feedback</h1>
          <p className="text-muted-foreground">Track your academic performance and view feedback.</p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{overallGPA}</div>
              <p className="text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +0.15 from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">91.7%</div>
              <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Grades Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Course Grades</CardTitle>
            <CardDescription>Your current standing in each course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.assignments.length} assignments graded
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{course.currentGrade}%</div>
                      <Badge variant="secondary" className="mt-1">{course.letterGrade}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium">{course.currentGrade}%</span>
                    </div>
                    <Progress value={course.currentGrade} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Assignment Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedCourse.name} - Assignment Details</CardTitle>
            <CardDescription>Detailed breakdown of grades and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCourse.assignments.map((assignment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{assignment.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${
                          (assignment.score / assignment.maxScore * 100) >= 90 ? 'text-success' : 
                          (assignment.score / assignment.maxScore * 100) >= 80 ? 'text-primary' : 
                          'text-warning'
                        }`}>
                          {assignment.score}/{assignment.maxScore}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          ({Math.round(assignment.score / assignment.maxScore * 100)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.weight}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      {assignment.feedback}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Grades;
