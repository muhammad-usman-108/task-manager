import { useState } from "react";
import { createTask } from "../../services/tasks";
import type { Task } from "../../types/task";


export function useCreateTask() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function createTaskHandler(newTask: Task) {
    setLoading(true);
    setError("");
    try {
      await createTask(newTask);
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

  return { createTaskHandler, loading, error };
}
