import { v4 as uuid } from 'uuid';

export const generateId = (): string => uuid();

export const defaultId: string = '00000000-0000-0000-0000-000000000000';
