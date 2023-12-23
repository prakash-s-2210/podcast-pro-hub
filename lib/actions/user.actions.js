"use server";

import { v4 as uuidv4 } from "uuid";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

// Fetching usercredential using local storage credential

export async function fetchUserCredential(token) {
  try {
    connectToDB();

    const loggedInUser = await User.findOne({ credentials: token });

    if (loggedInUser) {
      return loggedInUser.credentials;
    }
  } catch (error) {
    throw new Error(`Failed to fetch user credential: ${error.message}`);
  }
}

export async function fetchLoggedInUserId(token) {
  try {
    connectToDB();

    if (token) {
      const loggedInUser = await User.findOne({ credentials: token });
      return `/create-project/${loggedInUser._id}`;
    }
  } catch (error) {
    throw new Error(`Failed to fetch user credential: ${error.message}`);
  }
}

// SIGNUP - if email not existed in the Database create a user to the database . already email exist , throw an error

export async function createUser({ username, email }) {
  try {
    connectToDB();

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error(`User is already registered`);
    }
    const createdUser = await User.create({
      username,
      email,
      credentials: uuidv4(),
    });

    return {
      credential: createdUser.credentials,
      userId: createdUser._id,
    };
  } catch (error) {
    throw new Error(`Failed to sign up: ${error.message}`);
  }
}

// LOGIN - check email matches

export async function validateUserEmail(email) {
  try {
    connectToDB();

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      throw new Error(`Invalid Email`);
    }

    if (!userExist.credentials) {
      userExist.credentials = uuidv4();
      await userExist.save();
    }
    return {
      credential: userExist.credentials,
      userId: userExist._id,
    };
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
}
