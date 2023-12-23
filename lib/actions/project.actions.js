"use server";

import { revalidatePath } from "next/cache";

import Project from "../models/project.model";
import User from "../models/user.model";
import { chatbotConfigurationSchema } from "../models/project.model";
import { fileSchema } from "../models/project.model";
import { connectToDB } from "../mongoose";

// Create project - project model created with project title data and created object id added to loggedIn user database

export async function createProject({ title, credential, path }) {
  try {
    connectToDB();

    const createdProject = await Project.create({
      title,
    });

    const loggedInUser = await User.findOne({
      credentials: credential,
    });

    loggedInUser.projects.push(createdProject._id);

    await loggedInUser.save();

    revalidatePath(path.path)

    return "Project created successfully!";
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

// FETCH PROJECTS:

export async function fetchProjects(id) {
  try {
    connectToDB();
    const loggedInUser = await User.findOne({_id: id}).populate({
      path: "projects", // Use the plural form "projects" here
      model: Project,
    });

    return loggedInUser;
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}


//FETCH PROJECT:

export async function fetchProjectById(id) {
  try {
    connectToDB();
    const project = await Project.findOne({_id: id}).populate({
      path: "widgetConfiguration", // Use the plural form "projects" here
      model: chatbotConfigurationSchema,
    }).populate({
      path: "files", // Use the plural form "projects" here
      model: fileSchema,
    });
    return project;
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}