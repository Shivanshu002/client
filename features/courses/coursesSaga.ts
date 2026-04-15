import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { doGetCourses, doPostCourse, doPutCourse, doDeleteCourse } from './coursesService';
import {
  fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure,
  addCourseStart, addCourseSuccess, addCourseFailure,
  updateCourseStart, updateCourseSuccess, updateCourseFailure,
  deleteCourseStart, deleteCourseSuccess, deleteCourseFailure,
} from './coursesSlice';

function* fetchCoursesSaga() {
  try {
    const data: unknown = yield call(doGetCourses);
    yield put(fetchCoursesSuccess(data as never));
  } catch (e: unknown) {
    yield put(fetchCoursesFailure((e as Error).message ?? 'Failed to fetch courses'));
  }
}

function* addCourseSaga(action: PayloadAction<object>) {
  try {
    const data: unknown = yield call(doPostCourse, action.payload);
    yield put(addCourseSuccess(data as never));
  } catch (e: unknown) {
    yield put(addCourseFailure((e as Error).message ?? 'Failed to add course'));
  }
}

function* updateCourseSaga(action: PayloadAction<{ id: string; body: object }>) {
  try {
    const data: unknown = yield call(doPutCourse, action.payload.id, action.payload.body);
    yield put(updateCourseSuccess(data as never));
  } catch (e: unknown) {
    yield put(updateCourseFailure((e as Error).message ?? 'Failed to update course'));
  }
}

function* deleteCourseSaga(action: PayloadAction<string>) {
  try {
    yield call(doDeleteCourse, action.payload);
    yield put(deleteCourseSuccess(action.payload));
  } catch (e: unknown) {
    yield put(deleteCourseFailure((e as Error).message ?? 'Failed to delete course'));
  }
}

export function* coursesSaga() {
  yield takeLatest(fetchCoursesStart.type, fetchCoursesSaga);
  yield takeEvery(addCourseStart.type, addCourseSaga);
  yield takeEvery(updateCourseStart.type, updateCourseSaga);
  yield takeEvery(deleteCourseStart.type, deleteCourseSaga);
}
