import HttpStatusCode from "./HttpStatusCode";

export type Callback = (statusCode: HttpStatusCode, payload?: object) => void;
