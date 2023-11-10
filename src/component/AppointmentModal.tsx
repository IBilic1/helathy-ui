import * as React from "react";
import {Appointment} from "../types/auth/types";
import moment from "moment";

export type AppointmentProp = {
    appointment: Appointment;
}
export default function AppointmentModal({appointment}: AppointmentProp) {
    // list-a appointment kojih imam
    // selected one appointmetn -> mozda index npr

    return <div>
        <p>{moment(appointment.endDateTime).date()}</p>
        <p>{appointment.address}</p>
        <p>{appointment?.doctor?.firstName} {appointment?.doctor?.lastName}</p>
    </div>;
}