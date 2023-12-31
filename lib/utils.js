import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function timeAgo(timestamp) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const timeDifference = currentDate - providedDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "a year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? "a second ago" : `${seconds} seconds ago`;
  }
}

export function formatDate(timestamp) {
  let utcDate = new Date(timestamp);
  // Convert UTC to IST
  const istDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract individual components
  let year = istDate.getFullYear();
  let month = monthNames[istDate.getMonth()];
  let day = istDate.getDate();
  let hour = istDate.getHours();
  let minute = istDate.getMinutes();

  return `${year} ${month} ${day} | ${hour}:${minute}`;
}
