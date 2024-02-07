import { ZipCode } from "../zip-code";

export interface BasicRestaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    streetNr: string;
    zipCode: ZipCode;
}
