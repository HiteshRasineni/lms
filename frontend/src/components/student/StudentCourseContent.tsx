import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileVideo, FileText, ListChecks, File, Play, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StudentCourseContentProps {
  courseId: string;
  units: any[];
}

export const StudentCourseContent = ({ courseId, units }: StudentCourseContentProps) => {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const getTopicIcon = (type: string) => {
    switch (type) {
      case "video": return <FileVideo className="h-4 w-4" />;
      case "pdf": return <FileText className="h-4 w-4" />;
      case "quiz": return <ListChecks className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const handleTopicClick = (topic: any) => {
    setSelectedTopic(topic);
  };

  const markAsComplete = (topicId: string) => {
    setCompletedTopics(new Set([...completedTopics, topicId]));
  };

  if (!units || units.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No course content available yet. Your instructor is preparing the materials.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="student-course-content">
      <Accordion type="single" collapsible className="space-y-2">
        {units.map((unit, unitIndex) => (
          <AccordionItem key={unit._id} value={unit._id} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="font-semibold">Unit {unitIndex + 1}: {unit.title}</span>
                {unit.description && (
                  <span className="text-sm text-muted-foreground hidden md:block">
                    - {unit.description}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {unit.topics && unit.topics.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {unit.topics.map((topic: any, topicIndex: number) => (
                    <div
                      key={topic._id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleTopicClick(topic)}
                      data-testid={`topic-item-${unitIndex}-${topicIndex}`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          {getTopicIcon(topic.type)}
                          <span className="font-medium text-sm">{topic.title}</span>
                        </div>
                        {topic.description && (
                          <span className="text-xs text-muted-foreground hidden md:block">
                            {topic.description}
                          </span>
                        )}
                      </div>
                      {completedTopics.has(topic._id) ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No topics in this unit yet.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Topic Viewer Dialog */}
      {selectedTopic && (
        <Dialog open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]" data-testid="topic-viewer">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTopicIcon(selectedTopic.type)}
                {selectedTopic.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedTopic.description && (
                <p className="text-sm text-muted-foreground">{selectedTopic.description}</p>
              )}
              
              {selectedTopic.contentUrl && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  {selectedTopic.type === "video" && (
                    <video controls className="w-full rounded" data-testid="video-player">
                      <source src={selectedTopic.contentUrl} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {selectedTopic.type === "pdf" && (
                    <div className="space-y-2">
                      <iframe
                        src={selectedTopic.contentUrl.replace('/upload/', '/upload/fl_attachment/')}
                        className="w-full h-[600px] rounded border"
                        data-testid="pdf-viewer"
                       title="PDF Viewer"
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        If the PDF doesn't load, <a href={selectedTopic.contentUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">click here to open it in a new tab</a>.
                      </p>
                    </div>
                  )}
                  {(selectedTopic.type === "assignment" || selectedTopic.type === "quiz") && (
                    <div className="text-center p-8">
                      <p className="mb-4">This {selectedTopic.type} is available in the Assignments section.</p>
                      <Button onClick={() => setSelectedTopic(null)}>Go to Assignments</Button>
                    </div>
                  )}
                </div>
              )}

              {!selectedTopic.contentUrl && (
                <div className="text-center p-8 text-muted-foreground">
                  Content not available yet.
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedTopic(null)}>
                  Close
                </Button>
                {!completedTopics.has(selectedTopic._id) && (
                  <Button
                    onClick={() => {
                      markAsComplete(selectedTopic._id);
                      setSelectedTopic(null);
                    }}
                    data-testid="mark-complete-btn"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};