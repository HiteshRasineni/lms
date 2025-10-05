import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Plus, Search } from "lucide-react";

const Forum = () => {
  const discussions = [
    {
      id: 1,
      title: "Need help with Binary Search Tree implementation",
      author: "John Doe",
      course: "Data Structures",
      replies: 8,
      likes: 12,
      time: "2 hours ago",
      tags: ["algorithms", "trees", "help-needed"],
      preview: "I'm having trouble implementing the insert method for BST...",
    },
    {
      id: 2,
      title: "Best practices for React state management?",
      author: "Jane Smith",
      course: "Web Development",
      replies: 15,
      likes: 24,
      time: "5 hours ago",
      tags: ["react", "state", "best-practices"],
      preview: "What's the best approach for managing complex state in React apps?",
    },
    {
      id: 3,
      title: "Understanding time complexity of sorting algorithms",
      author: "Mike Johnson",
      course: "Data Structures",
      replies: 6,
      likes: 18,
      time: "1 day ago",
      tags: ["algorithms", "complexity", "sorting"],
      preview: "Can someone explain why quicksort is O(n log n) on average?",
    },
    {
      id: 4,
      title: "Study group for midterm exam",
      author: "Sarah Williams",
      course: "Computer Science",
      replies: 12,
      likes: 20,
      time: "1 day ago",
      tags: ["study-group", "exam", "collaboration"],
      preview: "Looking for students to form a study group for the upcoming midterm.",
    },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Course Forum</h1>
            <p className="text-muted-foreground">Discuss topics, ask questions, and collaborate with peers.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter by Course</Button>
              <Button variant="outline">Sort by</Button>
            </div>
          </CardContent>
        </Card>

        {/* Discussion List */}
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{discussion.course}</Badge>
                      <span className="text-xs text-muted-foreground">{discussion.time}</span>
                    </div>
                    <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
                      {discussion.title}
                    </CardTitle>
                    <CardDescription>{discussion.preview}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {discussion.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{discussion.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Discussion Form (shown when clicking New Discussion) */}
        <Card className="hidden">
          <CardHeader>
            <CardTitle>Start a New Discussion</CardTitle>
            <CardDescription>Share your questions or ideas with the class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Discussion title..." />
            </div>
            
            <div className="space-y-2">
              <Textarea 
                placeholder="What would you like to discuss?" 
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Input placeholder="Tags (comma separated)..." />
            </div>

            <div className="flex gap-3">
              <Button>Post Discussion</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Forum;