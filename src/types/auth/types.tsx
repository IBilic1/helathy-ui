export type User = {
    id?: number;
    name?: string;
    email?: string;
    role?: 'ADMIN' | 'USER';
};

export type Appointment = {
    id?: number;
    startDateTime?: string;
    endDateTime?: string;
    address: string;
    doctor?: User;
    patient?: User;
};

export type MyError = {
    error: any
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