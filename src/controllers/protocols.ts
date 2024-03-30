export interface IHttpReponse<T> {
  statusCode: number;
  body: T | string;
}
