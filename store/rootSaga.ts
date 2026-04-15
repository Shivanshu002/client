import { all } from 'redux-saga/effects';
import { coursesSaga } from '@/features/courses/coursesSaga';
import { trainersSaga } from '@/features/trainers/trainersSaga';
import { inquiriesSaga } from '@/features/inquiries/inquiriesSaga';

export function* rootSaga() {
  yield all([coursesSaga(), trainersSaga(), inquiriesSaga()]);
}
