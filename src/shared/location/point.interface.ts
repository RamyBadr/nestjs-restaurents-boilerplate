export interface IMongoPointType {
  readonly type: string;
}
export interface ILocationPoint {
  readonly lat: number;
  readonly lng: number;
}
export interface IHasLocation {
  location: ILocationPoint;
}
export interface IMongoPoint {
  readonly type: IMongoPointType;
  readonly coordinates: [number, number];
}

export interface IHasMongoPointLocation {
  location: IMongoPoint;
}
