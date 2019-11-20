export interface IMongoPoint {
  readonly type: IMongoPointType;
  readonly coordinates: [number];
}
export interface IMongoPointType {
  readonly type: string;
}
export interface ILocationPoint {
  readonly lat: number;
  readonly lng: number;
}
