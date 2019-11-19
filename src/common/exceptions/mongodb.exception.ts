import { HttpException } from "@nestjs/common";

export class MongoException extends HttpException{
  constructor(){
    super("MongoError",1001)
  }
}