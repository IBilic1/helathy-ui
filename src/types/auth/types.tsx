export type LoginRequest = {
    email: string;
    password: string;
};
export type SignUpRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "USER";
};

export type AuthResponse = {
    access_token: string;
    refresh_token: string;
};

export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
};

export type Appointment = {
    id?: number;
    startDateTime: string;
    endDateTime: string;
    address: string;
    doctor?: User;
    patient?: User;
};

export type Medicine = {
    id?: number;
    name: string;
    description: string;
    manufacturerId: number;
};

export type Manufacturer = {
    id?: number;
    name?: string;
    address?: string;
};

export type Order = {
    id?: number;
    description?: string;
    amount?: number;
    doseGap?: number;
    medicine?: Medicine;
};

export type PrescriptionUser = {
    email: string;
    password?: string;
};

export type Prescription = {
    id?: number;
    patient?: PrescriptionUser;
    doctor?: PrescriptionUser;
    orders: Order[];
    helperOrder?: Order;
};