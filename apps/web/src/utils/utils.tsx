import type { Status } from "@/types";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";

export const getDifficultyColor = (difficulty:string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

export const getStatusColor = (status:Status) => {
    if (!status)
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

export const getStatusIcon = (status:Status) => {
    if (!status) return <Clock className="h-4 w-4" />;

    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "PROCESSING":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "COMPLETED":
        return <CheckCircle2 className="h-4 w-4" />;
      case "FAILED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };