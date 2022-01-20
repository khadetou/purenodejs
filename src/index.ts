import http from "http";
import https from "https";
import url from "url";
import { StringDecoder } from "string_decoder";
import HttpStatusCode from "./lib/HttpStatusCode";
import Config from "./config";
import fs from "fs";
import path from "path";
import { Callbacks } from "./lib/interfaces";

const { httpPort, httpsPort, envName } = Config;

//Callbacks interface for handling requests

//Instantiate the http server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

//Start a server and have it listen on a port
httpServer.listen(httpPort, () =>
  console.log(`Http Server listening on port: ${httpPort} in ${envName} mode.`)
);

//Instantiate the https server
const httpsServerOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "..", "src/https/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "..", "src/https/cert.pem")),
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

//Start the https server
httpsServer.listen(httpsPort, () =>
  console.log(`Https Server listening on port: ${httpsPort}`)
);

//All the server logic for both the http and the https server
const unifiedServer = (req: any, res: any) => {
  //Get the url and parse it
  const parsedUrl = url.parse(req.url!, true);

  //Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path!.replace(/^\/+|\/+$/g, "");

  //Get The query string as an object
  const queryStringObject = parsedUrl.query;

  //Get the http method
  const method = req.method?.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  //Get the payload if any
  const decoder = new StringDecoder("utf-8");
  let buffer: string = "";
  req.on("data", (data: any) => (buffer += decoder.write(data)));
  req.on("end", () => {
    buffer += decoder.end();

    //Choose the handler this request should go to
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    //Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      buffer,
    };

    //Route the handler to the function specified in the router
    chosenHandler(data, (statusCode, payload) => {
      //Use the status code callback by handler or default
      statusCode = typeof statusCode === "number" ? statusCode : 200;

      //Use the payload called back by the handler, or default to an
      payload = typeof payload == "object" ? payload : {};

      //Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);

      //Send the response
      res.end(payloadString);

      //Log the response path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
};

//Define our handlers
const handlers: Callbacks = {};

//Ping handler
handlers.ping = (data, callBack) => {
  callBack(200);
};
handlers.notFound = (data, callBack) => {
  callBack(404);
};

//Define a request router
const router: Callbacks = {
  sample: handlers.sample,
};
