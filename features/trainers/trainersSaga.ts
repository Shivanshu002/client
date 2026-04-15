import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { doGetTrainers, doDeleteTrainer } from './trainersService';
import {
  fetchTrainersStart, fetchTrainersSuccess, fetchTrainersFailure,
  deleteTrainerStart, deleteTrainerSuccess, deleteTrainerFailure,
} from './trainersSlice';

function* fetchTrainersSaga() {
  try {
    const data: unknown = yield call(doGetTrainers);
    yield put(fetchTrainersSuccess(data as never));
  } catch (e: unknown) {
    yield put(fetchTrainersFailure((e as Error).message ?? 'Failed to fetch trainers'));
  }
}

function* deleteTrainerSaga(action: PayloadAction<string>) {
  try {
    yield call(doDeleteTrainer, action.payload);
    yield put(deleteTrainerSuccess(action.payload));
  } catch (e: unknown) {
    yield put(deleteTrainerFailure((e as Error).message ?? 'Failed to delete trainer'));
  }
}

export function* trainersSaga() {
  yield takeLatest(fetchTrainersStart.type, fetchTrainersSaga);
  yield takeEvery(deleteTrainerStart.type, deleteTrainerSaga);
}
