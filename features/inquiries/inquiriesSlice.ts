import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courseOfInterest: string;
  message: string;
  createdAt: string;
}

interface InquiriesState {
  data: Inquiry[];
  loading: boolean;
  error: string | null;
  submitted: boolean;
}

const initialState: InquiriesState = { data: [], loading: false, error: null, submitted: false };

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    fetchInquiriesStart: (state) => { state.loading = true; state.error = null; },
    fetchInquiriesSuccess: (state, action: PayloadAction<Inquiry[]>) => { state.loading = false; state.data = action.payload; },
    fetchInquiriesFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },

    addInquiryStart: (state) => { state.loading = true; state.submitted = false; },
    addInquirySuccess: (state, action: PayloadAction<Inquiry>) => { state.loading = false; state.submitted = true; state.data.unshift(action.payload); },
    addInquiryFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },
    resetSubmitted: (state) => { state.submitted = false; },
  },
});

export const {
  fetchInquiriesStart, fetchInquiriesSuccess, fetchInquiriesFailure,
  addInquiryStart, addInquirySuccess, addInquiryFailure, resetSubmitted,
} = inquiriesSlice.actions;

export default inquiriesSlice.reducer;
