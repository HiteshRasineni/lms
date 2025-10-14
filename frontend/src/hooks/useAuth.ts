import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, authStorage, User } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken();
      const storedUser = authStorage.getUser();

      if (token && storedUser) {
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
          authStorage.setUser(userData);
        } catch {
          authStorage.clear();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    authStorage.setToken(response.token!);
    authStorage.setUser(response);
    setUser(response);

    toast({
      title: "Login successful!",
      description: `Welcome back, ${response.name}!`,
    });

    // ✅ Navigate based on role
    if (response.role === "Teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }

    return response;
  };

  const register = async (name: string, email: string, password: string, role: "Student" | "Teacher") => {
    const response = await authApi.register({ name, email, password, role });

    toast({
      title: "Registration successful!",
      description: "Please check your email to verify your account.",
    });

    navigate("/verify/notice");
    return response;
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  const handleGoogleAuth = () => {
    authApi.googleLogin();
  };

  const handleGoogleCallback = async (token: string) => {
    const response = await authApi.handleGoogleCallback(token);
    authStorage.setToken(response.token!);
    authStorage.setUser(response);
    setUser(response);

    toast({
      title: "Google Sign-In successful!",
      description: `Welcome, ${response.name}!`,
    });

    // ✅ Slight delay to allow React Router to stabilize
    setTimeout(() => {
      if (response.role === "Teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    }, 200);

    return response;
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    handleGoogleAuth,
    handleGoogleCallback,
    isAuthenticated: !!user,
  };
};
