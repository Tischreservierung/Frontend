import { Category } from "./category";
import { EmpRestaurant } from "./DTO/emp-restaurant";
import { OpeningTime } from "./opening-time";
import { ZipCode } from "./zip-code";

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    zipCode : ZipCode;
    address : string;
    streetNr : string;
    openings : OpeningTime[];
    categories : Category[] | null;
}
