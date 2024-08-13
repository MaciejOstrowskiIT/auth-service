import { User } from '../domain/User';
import { User as UserType } from '../models/User';
import { DataMapper } from '../models/DataMapper';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  constructor(private users: DataMapper<User>) {}

  async create(request: Omit<UserType, 'id'>) {
    const user = new User(
      uuidv4(),
      request.email,
      request.password,
      request.username,
      request.accountId,
      request.status
    );
    await this.users.insert(user);
  }

  async fetch(id: string) {
    console.log(id)
    return await this.users.fetch(id);
  }

  async fetchByEmail(email: string) {
    return await this.users.fetchByEmail(email)
  }

  // async getUserData(id: string) {
  // 	const user = await this.fetch(id);
  // 	if (!user) return; //obsluga bledu
  // 	return user.getUserData(); // nasza metoda .mapToUserData()

  /*jak osbluzyc nowa logike biznesowa korzystajac z tego template'u aplikacji
		1. Tworzymy nowy route.
		2. Tworzymy nowa metode w controllerze, ktory bedzie callowany przez ten route
		3. tworzymy nowa metode na poziomie service (np. getUserAddress, bo mamy tylko fetch, ktory pobiera calego usera, a my calego nie chcemy)
		4. dodajemy nowa metoda na poziomie Entity/domeny (User), ktora na podstawie danych naszej instancji (entity/klasy) zwraca tylko te dane, ktorych
		oczekujemy. np metoda mapUserAddress(), ktora zwroci nam tylko adres usera
		5. returnujemy te dane z servicu do controllera
		6. controller zwraca je jako response
		//////////////////////////////////
		jakie dodatkowe korzysci daje ten template:
		1. jesli chcemy, zeby user od dzisiaj mial w sobie numer telefonu to dodajemy numer telefonu w modelu i w entity w serializerze i w metodzie mapToJson();
		*/
  // }

  async fetchAll() {
    return await this.users.fetchAll();
  }
  // async getAll() {
  // 	return await this.collection.find().toArray();
  // }

  // async getOneById(id: ObjectId): Promise<TransactionType | null> {
  // 	return await this.collection.findOne( id );
  // }

  // async createOne(transaction: User): Promise<TransactionType | null> {

  // 	const newTransactionId = await this.collection.insertOne( this.mapToDb(transaction) );

  //  	return await this.collection.findOne({_id: newTransactionId.insertedId})
  // }

  // private mapToEntity() {

  // }

  // private mapToDb(entity: User) {
  // 	return {_id: entity.getId(), ...entity}

  // }
}
