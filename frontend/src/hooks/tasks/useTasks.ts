import { useEffect, useState } from "react";
import { getTasks } from "../../services/todos";
import type { Task } from "../../types/task";

export function useTasks(): { tasks: Task[], error: string, loading: boolean} {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function getTasksList() {
          try {
            const result = await getTasks();
            setTasks(result.content);
          } catch(error) {
            if (error instanceof Error){
                setError(error.message);
            }
          } 
        }
    
        getTasksList();
        
      }, []);

      return { tasks: tasks, error: error, loading: false};
}