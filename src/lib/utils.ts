import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorsFromInitial(str: string) {
  // Define a map for each letter with a background and corresponding text color
  const colorMap = {
    A: { background: "#FFE0D6", text: "#FF5733" },
    B: { background: "#D6FFD6", text: "#33FF57" },
    C: { background: "#D6D6FF", text: "#5733FF" },
    D: { background: "#FFF4D6", text: "#FFC300" },
    E: { background: "#E9F7D6", text: "#DAF7A6" },
    F: { background: "#FFD6E2", text: "#C70039" },
    G: { background: "#F3D6FF", text: "#900C3F" },
    H: { background: "#DAD6FF", text: "#581845" },
    I: { background: "#D6FFE2", text: "#2ECC71" },
    J: { background: "#FFF5D6", text: "#F1C40F" },
    K: { background: "#EBD6FF", text: "#9B59B6" },
    L: { background: "#D6EBFF", text: "#2980B9" },
    M: { background: "#FFD6D6", text: "#E74C3C" },
    N: { background: "#FFEDD6", text: "#F39C12" },
    O: { background: "#D6FFF5", text: "#1ABC9C" },
    P: { background: "#D6EFFF", text: "#3498DB" },
    Q: { background: "#EBD6FF", text: "#9B59B6" },
    R: { background: "#D6FFE2", text: "#2ECC71" },
    S: { background: "#FFEED6", text: "#E67E22" },
    T: { background: "#D6FFF0", text: "#16A085" },
    U: { background: "#D6E4FF", text: "#34495E" },
    V: { background: "#EED6FF", text: "#8E44AD" },
    W: { background: "#D6E9FF", text: "#2C3E50" },
    X: { background: "#FFD8B3", text: "#D35400" },
    Y: { background: "#FFD6D6", text: "#C0392B" },
    Z: { background: "#D6FFE9", text: "#27AE60" },
  };

  // Get the first letter of the string and convert it to uppercase
  const initial = str.trim().charAt(0).toUpperCase();

  // Return the corresponding background and text colors or default colors
  return colorMap[initial] || { background: "#FFFFFF", text: "#000000" }; // Default to white bg, black text if letter is not found
}

export function formatDate(date: Date) {
  const now = new Date();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isYesterday = (d1, d2) => {
    const yesterday = new Date(d2);
    yesterday.setDate(d2.getDate() - 1);
    return isSameDay(d1, yesterday);
  };

  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isSameDay(date, now)) {
    return timeString; // If it's today, return the time
  } else if (isYesterday(date, now)) {
    return `Yesterday at ${timeString}`; // If it's yesterday, return "Yesterday at" and the time
  } else {
    const dateString = date.toLocaleDateString(); // For dates older than yesterday, return the full date and time
    return `${dateString} at ${timeString}`;
  }
}
