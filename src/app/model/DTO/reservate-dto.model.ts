export interface ReservateDto {
    restaurantId: number;
    customerId: number;
    day: Date;
    duration: number;
    numberOfPersons: number;
    note: string;
}
