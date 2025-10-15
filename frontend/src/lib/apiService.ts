import axios from "axios";
import { getToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with auth token
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ====================
// STUDY SESSIONS
// ====================
export const startStudySession = async (data?: { course?: string; activity?: string }) => {
  const response = await apiClient.post("/study-sessions/start", data);
  return response.data;
};

export const pingStudySession = async () => {
  const response = await apiClient.put("/study-sessions/ping");
  return response.data;
};

export const endStudySession = async () => {
  const response = await apiClient.post("/study-sessions/end");
  return response.data;
};

export const getStudyHoursSummary = async (days: number = 7) => {
  const response = await apiClient.get(`/study-sessions/summary?days=${days}`);
  return response.data;
};

export const getDailyTimetable = async (date: string) => {
  const response = await apiClient.get(`/study-sessions/timetable?date=${date}`);
  return response.data;
};

// ====================
// TODOS
// ====================
export const getTodos = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const createTodo = async (data: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
}) => {
  const response = await apiClient.post("/todos", data);
  return response.data;
};

export const updateTodo = async (id: string, data: Partial<{
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
}>) => {
  const response = await apiClient.put(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};

export const toggleTodo = async (id: string) => {
  const response = await apiClient.put(`/todos/${id}/toggle`);
  return response.data;
};

// ====================
// EVENTS
// ====================
export const getEvents = async (start?: string, end?: string) => {
  let url = "/events";
  if (start && end) {
    url += `?start=${start}&end=${end}`;
  }
  const response = await apiClient.get(url);
  return response.data;
};

export const createEvent = async (data: {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  course?: string;
  type?: "class" | "assignment" | "exam" | "event";
}) => {
  const response = await apiClient.post("/events", data);
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response = await apiClient.put(`/events/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
};

// ====================
// LEADERBOARD
// ====================
export const getLeaderboard = async (limit: number = 10, role?: string) => {
  let url = `/leaderboard?limit=${limit}`;
  if (role) {
    url += `&role=${role}`;
  }
  const response = await apiClient.get(url);
  return response.data;
};

export const getMyRank = async () => {
  const response = await apiClient.get("/leaderboard/my-rank");
  return response.data;
};

// ====================
// COURSES
// ====================
export const getCourses = async () => {
  const response = await apiClient.get("/courses");
  return response.data;
};

export const getEnrolledCourses = async () => {
  const response = await apiClient.get("/courses/enrolled");
  return response.data;
};

// ====================
// ASSIGNMENTS
// ====================
export const getAssignments = async () => {
  const response = await apiClient.get("/assignments");
  return response.data;
};

// ====================
// GRADES
// ====================
export const getMyGrades = async (studentId: string) => {
  const response = await apiClient.get(`/grades/student/${studentId}`);
  return response.data;
};

export default apiClient;