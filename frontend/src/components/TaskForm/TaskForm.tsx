import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTask } from '../../hooks/tasks/useCreateTask';
import { useUpdateTask } from '../../hooks/tasks/useUpdateTask';
import { useTasks } from '../../hooks/tasks/useTasks';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading } = useTasks();
  const taskToEdit = tasks.find((t) => t.id === Number(id));

  const [name, setName] = useState(taskToEdit?.name || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [status, setStatus] = useState(taskToEdit?.status || 'Progress');

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateTask.updateTaskHandler({
        id: Number(id),
        updatedTask: { name, description, status },
      });
    } else {
      await createTask.createTaskHandler({ name, description, status });
    }
    navigate('/tasks');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" textAlign="center" mb={3}>
        {id ? 'Edit Task' : 'Create New Task'}
      </Typography>

      <Stack spacing={3}>
        {/* Task Name */}
        <TextField
          label="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        {/* Description */}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
          fullWidth
        />

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            color={id ? 'primary' : 'success'}
            fullWidth
          >
            {id ? 'Update Task' : 'Create Task'}
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/tasks')}
            fullWidth
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
