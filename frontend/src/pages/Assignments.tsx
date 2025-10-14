import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Calendar } from "lucide-react";

const Assignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Algorithm Design Project",
      course: "Data Structures & Algorithms",
      description: "Design and implement efficient sorting algorithms with complexity analysis.",
      dueDate: "2024-01-15",
      totalPoints: 100,
      status: "pending",
    },
    {
      id: 2,
      title: "React Component Library",
      course: "Web Development Fundamentals",
      description: "Create a reusable component library with proper documentation.",
      dueDate: "2024-01-18",
      totalPoints: 150,
      status: "pending",
    },
    {
      id: 3,
      title: "Database Schema Design",
      course: "Introduction to Computer Science",
      description: "Design a normalized database schema for an e-commerce application.",
      dueDate: "2024-01-20",
      totalPoints: 75,
      status: "submitted",
    },
  ];

  const selectedAssignment = assignments[0];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">View and submit your course assignments.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Assignment List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold">All Assignments</h2>
            {assignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  assignment.id === selectedAssignment.id ? 'border-primary' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm">{assignment.title}</CardTitle>
                    <Badge variant={assignment.status === "submitted" ? "secondary" : "default"}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">{assignment.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="font-medium">{assignment.totalPoints}</span> points
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assignment Details & Submission */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedAssignment.title}</CardTitle>
                    <CardDescription>{selectedAssignment.course}</CardDescription>
                  </div>
                  <Badge variant={selectedAssignment.status === "submitted" ? "secondary" : "default"}>
                    {selectedAssignment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Due Date:</span>
                    <p className="font-medium">{selectedAssignment.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Points:</span>
                    <p className="font-medium">{selectedAssignment.totalPoints}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Implement the solution in your preferred programming language</li>
                    <li>Include comprehensive documentation and comments</li>
                    <li>Provide test cases and complexity analysis</li>
                    <li>Submit before the deadline</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {selectedAssignment.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Assignment</CardTitle>
                  <CardDescription>Upload your work or paste your solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="submission-text">Written Solution</Label>
                    <Textarea 
                      id="submission-text"
                      placeholder="Paste your code or written response here..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Files (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, ZIP up to 10MB
                      </p>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea 
                      id="comments"
                      placeholder="Any additional notes or explanations..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Assignment
                    </Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedAssignment.status === "submitted" && (
              <Card>
                <CardHeader>
                  <CardTitle>Submission Status</CardTitle>
                  <CardDescription>Your assignment has been submitted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-success">
                      ✓ Successfully submitted on January 12, 2024
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Your Submission</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Files: algorithm_project.zip (2.5 MB)
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Your assignment is being reviewed. You'll receive feedback and grade soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
