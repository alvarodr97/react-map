/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RootPlaces {
  data: PlacesData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface PlacesData {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: string;
  place_name_es: string;
  text: string;
  language?: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
  matching_text?: string;
  matching_place_name?: string;
}

export interface Properties {
  mapbox_id?: string;
  wikidata?: string;
  foursquare?: string;
  landmark?: boolean;
  address?: string;
  category?: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  text_es: string;
  language_es?: string;
  text: string;
  language?: string;
  short_code?: string;
}

export interface Headers {
  "cache-control": string;
  "content-type": string;
  "last-modified": string;
  "x-rate-limit-interval": string;
  "x-rate-limit-limit": string;
  "x-rate-limit-reset": string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  params: Params;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers2 {
  Accept: string;
}

export interface Params {
  limit: number;
  language: string;
  access_token: string;
  proximity: string;
}

export interface Request {}
