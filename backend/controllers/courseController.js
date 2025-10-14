import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, duration } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }
    const course = await Course.create({
      title,
      description,
      duration,
      teacher: req.user._id,
    });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacher", "name email");
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export const getStudentsInCourse = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate("student", "name email");
    res.json(enrollments.map(e => e.student));
  } catch (err) {
    next(err);
  }
};
