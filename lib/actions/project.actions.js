"use server";

import { revalidatePath } from "next/cache";

import Project from "../models/project.model";
import User from "../models/user.model";
import File from "../models/file.model";
import { connectToDB } from "../mongoose";

// Create project - project model created with project title data and created object id added to loggedIn user database

export async function createProject({ title, userId, path }) {
  try {
    console.log(userId, path)
    connectToDB();

    const createdProject = await Project.create({
      title,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { projects: createdProject._id },
    });

    revalidatePath(path);

    return "Project created successfully!";
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

// FETCH PROJECTS:

export async function fetchProjects(id) {
  try {
    connectToDB();
    const loggedInUser = await User.findOne({ _id: id }).populate({
      path: "projects",
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
    const project = await Project.findOne({ _id: id }).populate({
      path: "files",
      model: File,
    });
    return project;
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

// Create File:

export async function createFile({ title, description, projectId, path }) {
  try {
    connectToDB();

    const projectExist = await Project.findOne({ _id: projectId });

    if (!projectExist) {
      throw new Error(`File upload failed. Project doesnot exist`);
    }

    const createdFile = await File.create({
      title,
      description,
    });

    projectExist.files.push(createdFile._id);

    await projectExist.save();

    revalidatePath(path);

    return "File saved successfully!";
  } catch (error) {
    throw new Error(`Failed to create file: ${error.message}`);
  }
}

// Delete file

export async function deleteFile({ fileId, projectId, path }) {
  try {
    connectToDB();

    const projectExist = await Project.findOne({ _id: projectId });

    if (!projectExist) {
      throw new Error(`Delete operation failed. Project doesnot exist`);
    }

    const deletedFile = await File.findOneAndDelete({
      _id: fileId,
    });

    projectExist.files.pull(fileId);

    await projectExist.save();

    revalidatePath(path);

    return "File deleted successfully!";
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

//FETCH FILE:

export async function fetchFileById(id) {
  try {
    connectToDB();
    const file = await File.findOne({ _id: id });
    return file;
  } catch (error) {
    throw new Error(`Failed to fetch a file: ${error.message}`);
  }
}

// UPDATE FILE:
export async function updateFile({ title, description, fileId, path }) {
  try {
    connectToDB();
    const updatedFile = await File.findOneAndUpdate(
      { _id: fileId },
      { $set: { title, description } },
      { new: true }
    );

    revalidatePath(path);

    return "File updated successfully!";
  } catch (error) {
    throw new Error(`Failed to update file: ${error.message}`);
  }
}

// UPDATE WIDGET CONFIGURATION
export async function updateWidgetConfiguration({
  chatbotName,
  welcomeMessage,
  inputPlaceholder,
  primaryColor,
  fontColor,
  fontSize,
  chatHeight,
  showSources,
  chatIconSize,
  position,
  distanceFromBottom,
  horizontalDistance,
  botIcon,
  projectId,
  path,
}) {
  try {
    connectToDB();

    const updatedWidgetConfiguration = {
      chatbotName,
      welcomeMessage,
      inputPlaceholder,
      primaryColor,
      fontColor,
      fontSize,
      chatHeight,
      showSources,
      chatIconSize,
      position,
      distanceFromBottom,
      horizontalDistance,
      botIcon,
    };

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: { widgetConfiguration: updatedWidgetConfiguration } },
      { new: true }
    );

    revalidatePath(path);

    return "Widget configuration updated successfully!";
  } catch (error) {
    throw new Error(`Failed to update widget configuration: ${error.message}`);
  }
}
