import { Response } from "express";

export enum StatusCode {
    'ERROR' = 504,
    'NOT_FIND' = 404,
    'OK' = 200,
    'CREATED' = 201,
}

export class ResponseHandler<T = unknown> {
    constructor(private microservice: string, private controller: string) {}


    public sendResponse(res: Response, statusCode: StatusCode, message: string | Error, data?:T ) {
        return res.status(statusCode).send(this.buildResponseMessage(message, data))
    }


    private buildResponseMessage(message: string | Error, data?: T) {
        return {
            microservice: this.microservice,
            controller: this.controller,
            message,
            time: new Date().toISOString(),
            data
        }
    }


}