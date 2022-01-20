import { Callback, DataCallback } from "./types";

export interface Callbacks {
  [key: string]: (data: any, callback: Callback) => void;
}

export interface Libs {
  create: (
    dir: string,
    file: string,
    data: any,
    callback: DataCallback
  ) => void;
  basedir: string;
}
