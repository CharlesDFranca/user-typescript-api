export interface IHttpResponse<T> {
  statusCode: IHttpStatusCode;
  body: T | string;
}

export interface IHttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
}

export enum IHttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}
