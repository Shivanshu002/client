import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Trainer {
  _id: string;
  name: string;
  expertise: string;
  experience: string;
  photoUrl: string;
}

interface TrainersState {
  data: Trainer[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainersState = { data: [], loading: false, error: null };

const trainersSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {
    fetchTrainersStart: (state) => { state.loading = true; state.error = null; },
    fetchTrainersSuccess: (state, action: PayloadAction<Trainer[]>) => { state.loading = false; state.data = action.payload; },
    fetchTrainersFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },

    deleteTrainerStart: (state, _action: PayloadAction<string>) => { state.loading = true; },
    deleteTrainerSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter(t => t._id !== action.payload);
    },
    deleteTrainerFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  fetchTrainersStart, fetchTrainersSuccess, fetchTrainersFailure,
  deleteTrainerStart, deleteTrainerSuccess, deleteTrainerFailure,
} = trainersSlice.actions;

export default trainersSlice.reducer;
