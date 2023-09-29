import { Category } from "../category";
import { OpeningTime } from "../opening-time";
import { ZipCode } from "../zip-code";
import { Picture } from "../picture.model";

export interface RestaurantViewDto {
    id: number;
    name: string;
    description: string;
    zipCode: ZipCode;
    address: string;
    streetNr: string;
    categories: Category[];
    openings: OpeningTime[];
    pictures: Picture[];
}
