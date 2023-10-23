export interface ReservateDto {
    restaurantId: number;
    date: Date;
    time: string;
    duration: number;
    persons: number;
    note: string;
}
