import { ZipCode } from "./zip-code";

export interface Restaurant {
    name: string;
    zipCode : ZipCode;
    address : string;
    streetNr : string;
}
