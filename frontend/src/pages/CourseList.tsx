import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, Loader2, Plus } from "lucide-react";
import { getEnrolledCourses, getTeacherCourses } from "@/lib/apiService";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const CourseList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isTeacher = user?.role === "Teacher";

  useEffect(() => {
    loadCourses();
  }, [user]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      if (isTeacher) {
        // For teachers, get courses they teach
        const data = await getTeacherCourses();
        setCourses(data);
      } else {
        // For students, get enrolled courses
        const coursesData = await getEnrolledCourses();
        setCourses(coursesData);
      }
    } catch (error: any) {
      console.error("Error loading courses:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          `Failed to load ${isTeacher ? "teaching" : "enrolled"} courses`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: string) => {
    if (isTeacher) {
      navigate(`/teacher/courses/${courseId}`);
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <DashboardLayout
      userRole={user?.role === "Teacher" ? "teacher" : "student"}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold text-foreground mb-2"
              data-testid="my-courses-title"
            >
              My Courses
            </h1>
            <p className="text-muted-foreground">
              {isTeacher
                ? "Courses you are currently teaching."
                : "View and manage your enrolled courses."}
            </p>
          </div>
          {isTeacher ? (
            <Button
              onClick={() => navigate("/teacher/dashboard")}
              data-testid="back-to-dashboard-btn"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/explore-courses")}
              data-testid="explore-courses-btn"
            >
              Explore More Courses
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                {isTeacher ? "No Courses Created" : "No Courses Enrolled"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isTeacher
                  ? "Create your first course to start teaching."
                  : "Start your learning journey by exploring available courses."}
              </p>
              <Button
                onClick={() =>
                  navigate(
                    isTeacher ? "/teacher/dashboard" : "/explore-courses"
                  )
                }
              >
                {isTeacher ? "Create Course" : "Browse Courses"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isTeacher
              ? // Teacher view - showing teaching courses
                courses.map((course) => (
                  <Card
                    key={course._id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCourseClick(course._id)}
                    data-testid={`course-card-${course._id}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">
                          {course.level || "Beginner"}
                        </Badge>
                        <Badge
                          variant={course.isPublished ? "default" : "outline"}
                        >
                          {course.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.description || "No description"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{course.enrolledCount || 0} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {course.duration
                              ? `${course.duration} weeks`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        data-testid="manage-course-btn"
                      >
                        Manage Course
                      </Button>
                    </CardContent>
                  </Card>
                ))
              : // Student view - showing enrolled courses
                courses.map((enrollment) => {
                  const course = enrollment.course;
                  if (!course) return null;
                  return (
                    <Card
                      key={enrollment._id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCourseClick(course._id)}
                      data-testid={`course-card-${course._id}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary">
                            {course.level || "Beginner"}
                          </Badge>
                          <Badge>Enrolled</Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {course.title}
                        </CardTitle>
                        <CardDescription>
                          {course.teacher?.name || "Unknown Instructor"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{course.enrolledCount || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {course.duration
                                ? `${course.duration} weeks`
                                : "N/A"}
                            </span>
                          </div>
                          {course.averageRating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.averageRating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium">
                              {enrollment.progress || 0}%
                            </span>
                          </div>
                          <Progress
                            value={enrollment.progress || 0}
                            className="h-2"
                          />
                        </div>
                        <Button
                          className="w-full"
                          data-testid="continue-learning-btn"
                        >
                          Continue Learning
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CourseList;
