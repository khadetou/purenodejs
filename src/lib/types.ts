import HttpStatusCode from "./HttpStatusCode";

export type Callback = (statusCode: HttpStatusCode, payload?: object) => void;
export type DataCallback = (data?: string, bool?: boolean) => void;
