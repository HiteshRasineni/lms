import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");

      if (token) {
        try {
          await handleGoogleCallback(token);
        } catch (error) {
          console.error("Google OAuth callback error:", error);
          toast({
            title: "Authentication failed",
            description: "Error processing Google login.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Authentication failed",
          description: "No token received from Google.",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Completing Google Sign-In...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
