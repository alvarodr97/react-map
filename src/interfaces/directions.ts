/* eslint-disable @typescript-eslint/no-explicit-any */
// export interface DirectionsResponse {
//   routes: Route[];
//   waypoints: Waypoint[];
//   code: string;
//   uuid: string;
// }

// export interface Route {
//   country_crossed: boolean;
//   weight_name: string;
//   weight: number;
//   duration: number;
//   distance: number;
//   legs: Leg[];
//   geometry: Geometry;
// }

// export interface Geometry {
//   coordinates: Array<number[]>;
//   type: Type;
// }

// export enum Type {
//   LineString = "LineString",
// }

// export interface Leg {
//   via_waypoints: any[];
//   admins: Admin[];
//   weight: number;
//   duration: number;
//   steps: Step[];
//   distance: number;
//   summary: string;
// }

// export interface Admin {
//   iso_3166_1_alpha3: string;
//   iso_3166_1: string;
// }

// export interface Step {
//   intersections: Intersection[];
//   maneuver: Maneuver;
//   name: string;
//   duration: number;
//   distance: number;
//   driving_side: DrivingSide;
//   weight: number;
//   mode: Mode;
//   geometry: Geometry;
//   ref?: string;
// }

// export enum DrivingSide {
//   Left = "left",
//   Right = "right",
// }

// export interface Intersection {
//   entry: boolean[];
//   bearings: number[];
//   duration?: number;
//   mapbox_streets_v8?: MapboxStreetsV8;
//   is_urban?: boolean;
//   admin_index: number;
//   out?: number;
//   weight?: number;
//   geometry_index: number;
//   location: number[];
//   in?: number;
//   turn_weight?: number;
//   turn_duration?: number;
//   traffic_signal?: boolean;
// }

// export interface MapboxStreetsV8 {
//   class: Class;
// }

// export enum Class {
//   Primary = "primary",
//   Street = "street",
//   Tertiary = "tertiary",
// }

// export interface Maneuver {
//   type: string;
//   instruction: string;
//   bearing_after: number;
//   bearing_before: number;
//   location: number[];
//   modifier?: DrivingSide;
// }

// export enum Mode {
//   Driving = "driving",
// }

// export interface Waypoint {
//   distance: number;
//   name: string;
//   location: number[];
// }

export interface DataRoute {
  routes: Route[]
  waypoints: Waypoint[]
  code: string
  uuid: string
}

export interface Route {
  weight_name: string
  weight: number
  duration: number
  distance: number
  legs: Leg[]
  geometry: Geometry
}

export interface Leg {
  via_waypoints: any[]
  admins: Admin[]
  weight: number
  duration: number
  steps: any[]
  distance: number
  summary: string
}

export interface Admin {
  iso_3166_1_alpha3: string
  iso_3166_1: string
}

export interface Geometry {
  coordinates: number[][]
  type: string
}

export interface Waypoint {
  distance: number
  name: string
  location: number[]
}

export interface Headers {
  "cache-control": string
  "content-type": string
}

export interface Config {
  transitional: Transitional
  adapter: string[]
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env
  headers: Headers2
  baseURL: string
  params: Params
  method: string
  url: string
}

export interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

export interface Env {}

export interface Headers2 {
  Accept: string
}

export interface Params {
  language: string
  access_token: string
  alternatives: boolean
  geometries: string
  overview: string
  steps: boolean
}

export interface Request {}
