import { useState } from "react";
import { updateTask } from "../../services/tasks";

export function useUpdateTask() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function updateTaskHandler(data: { id: number, updatedTask: { name: string, description: string, status: string } }) {
    setLoading(true);
    setError("");
    try {
      await updateTask(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return { updateTaskHandler, loading, error };
}
