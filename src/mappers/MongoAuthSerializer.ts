import { User } from '../domain/User';
import { UserDb } from '../models/User';
import { Serializer } from './Serializer';

//TransactionDb powinno nazywac sie TransactionDbSchema
export class MongoAuthSerializer implements Serializer<UserDb, User> {
  mapToEntity(document: UserDb): User {
    return new User(
      document._id,
      document.email,
      document.username,
      document.password,
      document.accountId,
      document.status
    );
  }

  mapToDb(entity: User): UserDb {
    return { ...entity.mapToDb() };
  }
}
