export const ok = (body: any) => ({statusCode: 200, body})

export const created = (body: any) => ({statusCode: 201, body})

export const badRequest = (message: string) => {
  return {
    statusCode: 400, 
    body: message
  }
}

export const serverError = () => {
  return {
    statusCode: 500,
    body: "Something went wrong",
  }
}