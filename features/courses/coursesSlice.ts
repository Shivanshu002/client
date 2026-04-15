import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Course {
  _id: string;
  title: string;
  duration: string;
  fees: number;
  description: string;
  category: string;
  createdAt: string;
}

interface CoursesState {
  data: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = { data: [], loading: false, error: null };

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchCoursesStart: (state) => { state.loading = true; state.error = null; },
    fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => { state.loading = false; state.data = action.payload; },
    fetchCoursesFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },

    addCourseStart: (state) => { state.loading = true; },
    addCourseSuccess: (state, action: PayloadAction<Course>) => { state.loading = false; state.data.unshift(action.payload); },
    addCourseFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },

    updateCourseStart: (state) => { state.loading = true; },
    updateCourseSuccess: (state, action: PayloadAction<Course>) => {
      state.loading = false;
      const idx = state.data.findIndex(c => c._id === action.payload._id);
      if (idx !== -1) state.data[idx] = action.payload;
    },
    updateCourseFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },

    deleteCourseStart: (state) => { state.loading = true; },
    deleteCourseSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter(c => c._id !== action.payload);
    },
    deleteCourseFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure,
  addCourseStart, addCourseSuccess, addCourseFailure,
  updateCourseStart, updateCourseSuccess, updateCourseFailure,
  deleteCourseStart, deleteCourseSuccess, deleteCourseFailure,
} = coursesSlice.actions;

export default coursesSlice.reducer;
