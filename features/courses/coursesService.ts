import { doGet, doPost, doPut, doDelete } from '@/services';
import { Routes } from '@/utils/Routes';

export const doGetCourses = () => doGet(Routes.courses);
export const doPostCourse = (body: object) => doPost(Routes.courses, body);
export const doPutCourse = (id: string, body: object) => doPut(`${Routes.courses}/${id}`, body);
export const doDeleteCourse = (id: string) => doDelete(`${Routes.courses}/${id}`);
