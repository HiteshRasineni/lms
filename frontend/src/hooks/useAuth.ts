import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, authStorage, User } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

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
          // Verify token with backend
          const userData = await authApi.getProfile();
          setUser(userData);
          authStorage.setUser(userData);
        } catch (error) {
          // Token is invalid, clear storage
          authStorage.clear();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      authStorage.setToken(response.token);
      authStorage.setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${response.name}!`,
      });

      // Navigate based on role
      if (response.role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'Student' | 'Teacher') => {
    try {
      const response = await authApi.register({ name, email, password, role });
      authStorage.setToken(response.token);
      authStorage.setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      toast({
        title: "Registration successful!",
        description: `Welcome, ${response.name}!`,
      });

      // Navigate based on role
      if (response.role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleGoogleAuth = () => {
    authApi.googleLogin();
  };

  const handleGoogleCallback = async (token: string) => {
    try {
      const response = await authApi.handleGoogleCallback(token);
      authStorage.setToken(response.token);
      authStorage.setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      setUser({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      });
      
      toast({
        title: "Google Sign-In successful!",
        description: `Welcome, ${response.name}!`,
      });

      // Navigate based on role
      if (response.role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Google Sign-In failed",
        description: error.response?.data?.message || "Failed to authenticate with Google",
        variant: "destructive",
      });
      throw error;
    }
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
