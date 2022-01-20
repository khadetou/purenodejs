import { Callback } from "./types";
/**
 *
 * Library for storing and editing data
 *
 */

//Dependencies

import fs from "fs";
import path from "path";
import { Libs } from "./interfaces";

//Container for the module to be exported
const lib: Libs = {
  create: () => {},
  basedir: "",
};

//Base directory of the data folder
lib.basedir = path.join(__dirname, "../..", "data");

console.log(lib.basedir);

//Write data to a file
lib.create = (dir, file, data, callBack) => {
  //Open the file for writing
  fs.open(`${lib.basedir}/${dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //Convert data to string
      const stringData = JSON.stringify(data);

      //Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callBack("", false);
            } else {
              callBack("Error closing new file");
            }
          });
        } else {
          callBack("Error writing to new file");
        }
      });
    } else {
      callBack("Could not create a new file, It might already exist!");
    }
  });
};
