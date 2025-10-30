import { useState } from "react";
import { deleteTask } from "../../services/tasks";

export function useDeleteTask(): {
  deleteTaskHandler: (id: number) => Promise<void>;
  error: string;
  loading: boolean;
  success: boolean;
} {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function deleteTaskHandler(id: number) {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await deleteTask(id);
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting the task.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { deleteTaskHandler, error, loading, success };
}
