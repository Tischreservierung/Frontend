import { OpeningTime } from "../opening-time";

export interface ReservationView {
    id: number;
    restaurantName: string;
    picture: string;
    openings: OpeningTime[];
}
