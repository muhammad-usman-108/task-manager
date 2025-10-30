import React from "react";
import type { Task } from "../../types/task";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid/models/colDef";
import { useNavigate } from "react-router-dom";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import {
  Paper,
  Button,
  Box,
  Typography,
  useMediaQuery,
  Tooltip,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  page: number;
  totalElements: number;
  onPageChange: (newPage: number) => void;
}

function Tasks({ tasks, setTasks, page, onPageChange, totalElements }: TasksProps) {
  const navigate = useNavigate();
  const { deleteTaskHandler, loading } = useDeleteTask();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (id: number) => navigate(`/tasks/${id}/edit`);
  const handleAdd = () => navigate("/tasks/new");
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTaskHandler(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 60 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "description", headerName: "Description", flex: 1.5, minWidth: 200 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => {
        const iso = params.slice(0, 23) + "Z";
        const date = new Date(iso);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
        }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Task">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row.id)}
            >
              {!isMobile && "Edit"}
            </Button>
          </Tooltip>

          <Tooltip title="Delete Task">
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row.id)}
              disabled={loading}
            >
              {!isMobile && "Delete"}
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Task Manager
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            alignSelf: { xs: "stretch", sm: "center" },
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Add Task
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ width: "100%", overflow: "hidden", borderRadius: 3, p: 2 }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pagination
          paginationMode="server"
          rowCount={totalElements}
          pageSizeOptions={[10]}
          paginationModel={{ page: page - 1, pageSize: 10 }}
          onPaginationModelChange={(model) => onPageChange(model.page + 1)}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[200],
              fontWeight: "bold",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default React.memo(Tasks);
