import { Time } from "@angular/common";

export interface ReservationOption {
    day: Date;
    startTime: Time;
    endTime: Time;
    duration: number;
    restaurantTableId: number;
    seatPlaces: number;
}
