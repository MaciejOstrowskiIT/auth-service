import { Collection, InsertOneResult, ObjectId } from 'mongodb';
import { IGetter } from '../interfaces/IGetter';
import { User } from '../models/userModel';
import { IDataService } from '../interfaces/IDataService';

export class MongoService implements IGetter<User>, IDataService<User> {
  constructor(private collection: Collection<User>) {}

  async getAll(): Promise<User[]> {
    return await this.collection.find().toArray();
  }

  async findOne(filter: { email: any }): Promise<User | null> {
    return await this.collection.findOne(filter);
  }

  async insertOne(data: Omit<User, '_id'>): Promise<InsertOneResult<User>> {
    return await this.collection.insertOne(data);
  }

  async getOneById(id: ObjectId): Promise<User | null> {
    return await this.collection.findOne({ _id: id });
  }
}
