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