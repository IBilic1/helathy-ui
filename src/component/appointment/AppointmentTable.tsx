import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/joy/Table';
import {Appointment} from "../../types/auth/types";
import EditAppointmentModal from "./EditAppointmentModal";
import ConfirmDialog from "../dialog/ConfirmDialog";
import {useDeleteAppointmentMutation} from "../../store/query/appointment.query";
import {useRole} from "../../utils/utils";
import {FormattedMessage} from "react-intl";
import dayjs, {Dayjs} from "dayjs";
import {Button} from "@mui/joy";
import Box from "@mui/joy/Box";

export type BasicTableProp = {
    selectedDay?: Dayjs;
    data: Appointment[];
    refetch: () => void;
};

export default function AppointmentTable({selectedDay, data, refetch}: BasicTableProp) {
    const isAdmin = useRole();
    const [open, setOpen] = useState<boolean>(false);

    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [appointment, setAppointment] = useState<Appointment | undefined>();
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | undefined>();
    const [deleteAppointment] = useDeleteAppointmentMutation();

    const filteredData = data.filter((appointment) => {
        if (!selectedDay) return true;
        const appointmentDate = new Date(appointment.startDateTime || '');
        const selectedDate = selectedDay.startOf('day').toDate();
        return (
            appointmentDate.toDateString() === selectedDate.toDateString()
        );
    });

    return (
        <>
            <Table aria-label="appointments table">
                <thead>
                <tr>
                    <th style={{width: '30%'}}><FormattedMessage id="appointments_address"/></th>
                    <th><FormattedMessage id="start"/></th>
                    <th><FormattedMessage id="end"/></th>
                    <th><FormattedMessage id="doctor"/></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.address}</td>
                        <td>{dayjs(row.startDateTime).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{dayjs(row.endDateTime).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{row.doctor?.name}</td>
                        <td>
                            {isAdmin && (
                                <Box>
                                    <Button
                                        variant='solid'
                                        sx={{mr: '10px'}}
                                        onClick={() => {
                                            setAppointment(row);
                                            setOpen(true);
                                        }}
                                    >
                                        <FormattedMessage id="edit"/>
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setAppointmentToDelete(row);
                                            setDeleteDialog(true);
                                        }}
                                    >
                                        <FormattedMessage id="delete"/>
                                    </Button>
                                </Box>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <EditAppointmentModal open={open} setOpen={setOpen} appointment={appointment} refetch={refetch}/>
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete appointment"
                description="Are you sure you want to delete the appointment?"
                onConfirm={() => {
                    appointmentToDelete?.id && deleteAppointment(appointmentToDelete?.id).then(() => {
                        refetch();
                    });
                }}
            />
        </>
    );
}
