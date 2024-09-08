import * as React from "react";
import {Appointment} from "../../types/auth/types";
import moment from "moment";

export type AppointmentProp = {
    appointment: Appointment;
}
export default function AppointmentModal({appointment}: AppointmentProp) {
    return <div>
        <p>{moment(appointment.endDateTime).date()}</p>
        <p>{appointment.address}</p>
        <p>{appointment?.doctor?.name} {appointment?.doctor?.name}</p>
    </div>;
}