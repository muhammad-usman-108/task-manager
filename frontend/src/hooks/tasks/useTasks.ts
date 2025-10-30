import { useEffect, useState } from "react";
import { getTasks } from "../../services/tasks";
import type { Task } from "../../types/task";

export function useTasks(pageSize = 10) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState<any>();
  const [totalElements, setTotalElements] = useState<number>(0);

  async function refreshTasks(nextPage?: number) {
    setLoading(true);
    try {
      const page = nextPage ?? pageNumber;
      const result = await getTasks(page, pageSize);
      setTasks(result.content);
      setPageInfo(result.pageable);
      setPageNumber(result.pageable.pageNumber);
      setTotalElements(result.totalElements);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return { tasks, error, loading, pageInfo, setTasks, refreshTasks, pageNumber, setPageNumber, totalElements };
}
