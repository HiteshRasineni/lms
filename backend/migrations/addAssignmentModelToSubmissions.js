import mongoose from "mongoose";
import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import Topic from "../models/Topic.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Migration script to add assignmentModel field to existing submissions
 * Run this once to update all existing submissions in the database
 */
async function migrateSubmissions() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://localhost:27017/lms";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Get all submissions without assignmentModel field
    // Use direct MongoDB query to bypass Mongoose validation
    const submissions = await mongoose.connection.db.collection('submissions').find({ 
      assignmentModel: { $exists: false } 
    }).toArray();

    console.log(`Found ${submissions.length} submissions to migrate`);

    let updated = 0;
    let errors = 0;

    for (const submission of submissions) {
      try {
        // Check if assignment exists in Assignment collection
        const assignment = await Assignment.findById(submission.assignment);
        
        let assignmentModel = "Assignment";
        
        if (!assignment) {
          // Check if it exists in Topic collection
          const topic = await Topic.findById(submission.assignment);
          
          if (topic && topic.type === "assignment") {
            assignmentModel = "Topic";
          } else {
            console.log(`Warning: Assignment/Topic not found for submission ${submission._id}`);
            // Default to Assignment for backwards compatibility
            assignmentModel = "Assignment";
          }
        }

        // Update the submission using direct MongoDB query
        await mongoose.connection.db.collection('submissions').updateOne(
          { _id: submission._id },
          { $set: { assignmentModel: assignmentModel } }
        );
        
        updated++;
        if (updated % 10 === 0) {
          console.log(`Progress: ${updated}/${submissions.length}`);
        }
      } catch (err) {
        console.error(`Error migrating submission ${submission._id}:`, err.message);
        errors++;
      }
    }

    console.log("\n=== Migration Complete ===");
    console.log(`Successfully updated: ${updated}`);
    console.log(`Errors: ${errors}`);
    console.log(`Total processed: ${submissions.length}`);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the migration
migrateSubmissions();
