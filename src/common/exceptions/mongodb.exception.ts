import { HttpException,BadRequestException } from "@nestjs/common";

export class MongoException extends BadRequestException{
  public error:any;
  constructor(error:any){
    super("MongoError")
    this.error=error;
  }
}