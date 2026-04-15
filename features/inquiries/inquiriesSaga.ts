import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { doGetInquiries, doPostInquiry } from './inquiriesService';
import {
  fetchInquiriesStart, fetchInquiriesSuccess, fetchInquiriesFailure,
  addInquiryStart, addInquirySuccess, addInquiryFailure,
} from './inquiriesSlice';

function* fetchInquiriesSaga() {
  try {
    const data: unknown = yield call(doGetInquiries);
    yield put(fetchInquiriesSuccess(data as never));
  } catch (e: unknown) {
    yield put(fetchInquiriesFailure((e as Error).message ?? 'Failed to fetch inquiries'));
  }
}

function* addInquirySaga(action: PayloadAction<object>) {
  try {
    const data: unknown = yield call(doPostInquiry, action.payload);
    yield put(addInquirySuccess(data as never));
  } catch (e: unknown) {
    yield put(addInquiryFailure((e as Error).message ?? 'Failed to submit inquiry'));
  }
}

export function* inquiriesSaga() {
  yield takeLatest(fetchInquiriesStart.type, fetchInquiriesSaga);
  yield takeEvery(addInquiryStart.type, addInquirySaga);
}
