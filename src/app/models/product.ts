
export interface Response
{
  headers: {},
  statusCode: number,
  body:Body,
}
export interface Body{
  Items:string
  Count: number,
  ScannedCount: number,
  ResponseMetadata: {}
}
export interface IProduct
{
  Name:string;
  Category:string;
  Price:number;
  Image:String;
  Quantity: number;
}
