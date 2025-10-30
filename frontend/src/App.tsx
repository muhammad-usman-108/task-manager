import { Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm/TaskForm';
import TaskListPage from './pages/TaskListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TaskListPage />} />
      <Route path="/tasks/new" element={<TaskForm />} />
      <Route path="/tasks/:id/edit" element={<TaskForm />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}


// import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
// import './App.css'
// import Search from './components/Search/Search';
// import { useTasks } from './hooks/tasks/useTasks';
// import type { Task } from './types/task';
// import React from 'react';
// import { useDebounce } from './hooks/debounce';
// import Pagination from './components/Pagination/Pagination';
// const Tasks = React.lazy(() => import('./components/Tasks/Tasks'));

// function App() {

//   const [searchText, setSearchText] = useState<string>('');
//   const [page, setPage] = useState<number>(1);
//   const { tasks, error, loading = true } = useTasks();
//   const debounceText: string = useDebounce(searchText, 500);
//   const tasksPerPage = 10;

//   console.log("TASK IS : ", tasks);

//   const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(event.target.value);
//   }, []);

//   const paginationHandler = useCallback((value: number) => {
//     setPage(prev => prev + value);
//   }, []);

//   const filteredTasks: Task[] = useMemo(() => {
//     if (!Array.isArray(tasks) || tasks.length === 0) return [];

//     return tasks.filter((task) => task.name && task.description.toLowerCase().includes(debounceText?.toLowerCase()));
//   }, [ tasks, debounceText]);

//   const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

//   const pageTodos = useMemo(() => {
//     const startIndex = (page - 1) * tasksPerPage;
//     const endIndex = startIndex + tasksPerPage;

//     return filteredTasks.slice(startIndex, endIndex);
//   }, [page, filteredTasks]);

//   useEffect(() => {
//     setPage(1);
//   }, [debounceText]);

//   if (loading) {
//     return <div>The data is loading ...........</div>;
//   }

//   else if (error) {
//     return <div>Error occured : {error}</div>;
//   }

//   else if (tasks.length === 0) {
//     return <div>Task list is empty..........</div>;
//   }

//   else {
//     return (
//       <>
//         <Search searchText={searchText} handleSearch={handleSearch} />
//         <Suspense fallback={<div>Component is loading. Please wait little bit ........</div>}>
//           { filteredTasks.length > 0 && 
//             <>
//               <Tasks tasks={pageTodos}/>
//               <Pagination page={page} totalPages={totalPages} paginationHandler={paginationHandler} />
//             </>
//           }
//           { filteredTasks.length === 0 && <div>Can't found any todo with {debounceText}</div>}
//         </Suspense>
        
//       </>
//     )
//   }
  
// }

// export default App
