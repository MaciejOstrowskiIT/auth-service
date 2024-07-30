import { InsertOneResult } from 'mongodb';

export interface IDataService<T> {
  findOne(filter: any): Promise<T | null>;

  insertOne(data: Omit<T, '_id'>): Promise<InsertOneResult<T>>;
}