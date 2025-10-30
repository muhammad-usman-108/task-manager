import React, { Suspense, useMemo, useState, useCallback, useEffect } from 'react';
import { useTasks } from '../hooks/tasks/useTasks';
import { useDebounce } from '../hooks/debounce';
import Search from '../components/Search/Search';
const Tasks = React.lazy(() => import('../components/Tasks/Tasks'));

export default function TaskListPage() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const { tasks, error, loading, pageInfo, setTasks, refreshTasks, pageNumber, setPageNumber, totalElements} = useTasks();


  const debounceText = useDebounce(searchText, 500);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value), []);

  const filteredTasks = useMemo(() => {
  if (!Array.isArray(tasks) || tasks.length === 0) return [];

  return tasks.filter(task => 
    task.name?.toLowerCase().includes(debounceText?.toLowerCase()) || 
    task.description?.toLowerCase().includes(debounceText?.toLowerCase())
  );
}, [tasks, debounceText]);


console.log("Pagination : ", pageInfo);

  useEffect(() => setPage(1), [debounceText]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tasks.length) return <div>No tasks found</div>;

  return (
    <>
      <Search searchText={searchText} handleSearch={handleSearch} />
      <Suspense fallback={<div>Loading table...</div>}>
         <Tasks
          tasks={filteredTasks}
          setTasks={setTasks}
          page={page}
          totalElements={totalElements}
          onPageChange={(newPage) => {
            setPage(newPage);
            refreshTasks(newPage - 1); // backend expects 0-based page index
          }}
        />
      </Suspense>
    </>
  );
}
