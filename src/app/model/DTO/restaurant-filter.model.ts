import { Category } from "../category";
import { Picture } from "../picture.model";
import { ZipCode } from "../zip-code";

export interface RestaurantFilter {
    id: number;
    name: string;
    description: string;
    zipCode: ZipCode;
    address: string;
    streetNr: string;
    categories: Category[];
    profilPicture: Picture;
}
