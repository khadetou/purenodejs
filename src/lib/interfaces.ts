import { Callback } from "./types";

export interface Callbacks {
  [key: string]: (data: any, callback: Callback) => void;
}

export interface Libs {
  [key: string]: (
    dir: string,
    file: string,
    data: string,
    callback: Callback
  ) => void;
}
