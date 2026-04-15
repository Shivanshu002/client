import { combineReducers } from '@reduxjs/toolkit';
import coursesReducer from '@/features/courses/coursesSlice';
import trainersReducer from '@/features/trainers/trainersSlice';
import inquiriesReducer from '@/features/inquiries/inquiriesSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  trainers: trainersReducer,
  inquiries: inquiriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
