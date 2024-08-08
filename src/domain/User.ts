import { UserDb, UserType } from "../models/User";
import {IDomain} from './IDomain';

type UserKeys = keyof UserType

export class User implements IDomain<UserType> {
    constructor(
        private id: string,
        private email: string,
        private username: string,
        private password: string

    ) {}

    getId(): string {
        return this.id
    }

    mapToJson(): UserType {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            password: this.password,
        }
    }
    mapToDb():UserDb {
       return { _id: this.id,
        email: this.email,
        username: this.username,
        password: this.password,
    }}
}