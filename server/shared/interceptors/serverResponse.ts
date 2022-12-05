import { CtraficHttpStatusCode } from "../constants/HTTPStatus";
import { Response } from "express";

export class ServerResponse<T = any> {
  constructor(
    private status: CtraficHttpStatusCode,
    private message: string,
    private data?: T,
    private error?: any,
    private timestamp?: number
  ) {
    this.timestamp = Date.now();
  }
  public sendResponse(res: Response) {
    res.status(this.status).json(this);
  }
}
