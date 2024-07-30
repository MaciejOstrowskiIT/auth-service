import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId,
  username: string,
  password: string,
  email: string,
  accountId: null | ObjectId,
  status: 'ACTIVE' | 'PENDING',
}

export interface LoginUser {
  email: string,
  password: string
}

export type PermissionType = {
  _id: ObjectId
}