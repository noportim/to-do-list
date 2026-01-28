import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { initialState } from "./types";

// Create Task
export const createTask = createAsyncThunk<
  any,
  { title: string; text?: string }
>("task/createTask", async (params) => {
  try {
    const { data } = await api.post("/tasks", params);

    return data;
  } catch (error) {
    console.log(error);
  }
});

// Get All Tasks By User
export const getAllTasks = createAsyncThunk<any, void>(
  "task/getAllTasks",
  async () => {
    try {
      const { data } = await api.get("/tasks/all");

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

// Get Task By Id
export const getTask = createAsyncThunk<any, string | undefined>(
  "task/getTask",
  async (params) => {
    try {
      const { data } = await api.get(`/tasks/${params}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

// Delete Task By Id
export const deleteTask = createAsyncThunk<
  { message?: string },
  string | undefined
>("task/deleteTask", async (params) => {
  try {
    const { data } = await api.delete(`tasks/${params}/delete`);

    return data;
  } catch (error) {
    console.log(error);
  }
});

// Edit Task By Id
export const editTask = createAsyncThunk<
  { message?: string },
  { id: string; title: string; text?: string }
>("task/editTask", async ({ id, title, text }) => {
  const { data } = await api.put(`/tasks/${id}/edit`, {
    title,
    text,
  });

  return data;
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
      })
      // Get All Task
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.loading = false;
      })
      // Get Task By Id
      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTask.rejected, (state) => {
        state.loading = false;
      })
      // Delete Task By Id
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
      })
      // Edit Task By Id
      .addCase(editTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(editTask.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;
