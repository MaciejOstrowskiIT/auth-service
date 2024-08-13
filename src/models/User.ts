import { ObjectId } from 'mongodb';

export interface User {
  id: string,
  username: string,
  password: string,
  email: string,
  accountId: string | null,
  status: 'ACTIVE' | 'PENDING',
}

export type UserDb = Omit<User, "id"> & { _id: string }
