import { doGet, doDelete } from '@/services';
import { Routes } from '@/utils/Routes';

export const doGetTrainers = () => doGet(Routes.trainers);
export const doDeleteTrainer = (id: string) => doDelete(`${Routes.trainers}/${id}`);
