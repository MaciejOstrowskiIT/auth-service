import { ObjectId } from "mongodb";
import { UserDb, User as UserType } from "../models/User";
import {IDomain} from './IDomain';
import bcrypt from "bcrypt";

type UserKeys = keyof UserType

export class User implements IDomain<UserType> {
    constructor(
        private id: string,
        private email: string,
        private username: string,
        private password: string,
        private accountId: string | null,
        private status : "ACTIVE" | "PENDING",

    ) {}

    getId(): string {
        return this.id
    }

    getPassword(): string {
      return this.password;
    }

    comparePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password)
    }


    mapToJson(): UserType {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            password: this.password,
            accountId: this.accountId,
            status: this.status,
        }
    }
    mapToDb():UserDb {
       return { _id: this.id,
        email: this.email,
        username: this.username,
        password: this.password,
        accountId: this.accountId,
        status: this.status,
    }}
}