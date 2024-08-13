import express from 'express';
import cors from 'cors';
import { logger } from './utils/logs';
import { MongoClient } from 'mongodb';
import { Controller } from './controllers/Controller';
import { AuthService } from './services/AuthService';
import { MongoMapper } from './mappers/MongoMapper';
import { MongoAuthSerializer } from './mappers/MongoAuthSerializer';
import { registerRoutes } from './utils/registerRoutes';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

(async () => {
  try {
    const mongoClient = await new MongoClient(process.env.MONGO_URL!).connect();
    const database = mongoClient.db(process.env.DATABASE_NAME!);
    app.listen(process.env.PORT);
    logger('info', 'Auth Microservice is working fine at port ' + process.env.PORT);

    const collection = database.collection<any>(process.env.COLLECTION_NAME!);
    const service = new AuthService(
      new MongoMapper(database.collection(process.env.COLLECTION_NAME!), new MongoAuthSerializer())
    );
    const controller = new Controller(service);


    registerRoutes(app, controller)
  } catch (err) {
    console.log('App crashed due to an error:  ' + err);
  }
})();

/*
 * sposoby na dodawanie permissions automatycznie:
 * 1. Tworzymy sobie zmienna (w jakims oddzielnym pliku) lub jsona, ktory zawiera liste naszych permissions (bez id).
 * Tworzymy sobie funkcje, ktora z kolekcji permissions pobiera wszystkie permissions i porownujemy ja z nasza lista,
 *  np: na podstawie length tablicy, nozna tez dokladniej czy to co w bazie pokrywa sie z naszymi. Jesli nie, to
 *  wykonujemy request do bazy danych, zeby je stworzyc.
 * + przy kazdym odpaleniu serwisu sprawdzamy czy lista jest taka jak powinna byc
 * + mozemy rozwinac funkcje w ten sposob, zeby dodawala tylko brakujace permissions, czyli jak sobie dodamy do
 *  naszego jsona nowe permission to automatycznie sie doda po odpaleniu
 * - przy kazdym odpaleniu serwisu odpalamy funkcje, ktora w wiekszosci przypadkow nic nie zrobi poza wykonaniem
 *  requestu i porownaniem
 * - przechowujemy ta liste i tak w kodzie zamiast w bazie
 *
 * 2. Mozemy stworzyc taki plik jak opisany wyzej, zostawic go w kodzie, np w folderze config i napisac skrypt, do
 *  opalania go. Czyli jesli bedziemy potrzebowac to przy uzyciu skryptu czy to  z kontenera czy to z lokalnej
 *  maszyny, mozemy go odpalic i dodac sobie rekordy do bazy.
 *
 * + nie odpalamy zbednych funckji przy odpalaniu serwisu
 * - dane dalej trzymamy w kodzie
 * - jesli chcemy odpalic ten skrypt z dockera musimy umiec wejsc do kontenera (oraz pisac skrypty)
 *
 *
 * 3. Dodac te rekordy recznie to bazy za pomoca compassa.
 * - po pierwszym dodaniu, mozemy zrobic sobie dump bazy danych. I w przypadku jesli odpalimy baze na nowo (czysta),
 *  mozemy zrestorowac ta kolekcje.
 * + nie mamy zbednego kodu
 * + nie przechowujemy danych w kodzie, tylko w innym miejscu na dysku (troche devopsowe podejscie)
 * - troche uciazliwe
 * - za kazdym razem jak chcemy dodac nowe permission, musimy robic to recznie i robic nowy dump bazy (ew, mozemy to
 *  zautoamtyzowac, moznaby zaciagac dump bazy przy odpalaniu docker-compose).
 * */
