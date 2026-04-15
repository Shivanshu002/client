import { doGet, doPost } from '@/services';
import { Routes } from '@/utils/Routes';

export const doGetInquiries = () => doGet(Routes.inquiries);
export const doPostInquiry = (body: object) => doPost(Routes.inquiries, body);
