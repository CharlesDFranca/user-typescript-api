import { IHttpStatusCode } from './protocols'

export const ok = (body: any) => ({ 
  statusCode: IHttpStatusCode.OK, 
  body 
});

export const created = (body: any) => ({ 
  statusCode: IHttpStatusCode.BAD_REQUEST, 
  body });

export const badRequest = (message: string) => {
  return {
    statusCode: IHttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = () => {
  return {
    statusCode: IHttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};
