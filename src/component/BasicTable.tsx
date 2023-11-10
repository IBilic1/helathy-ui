import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Appointment} from "../types/auth/types";
import {Button} from "@mui/material";
import EditAppointmentModal from "./EditAppointmentModal";
import ConfirmDialog from "./dialog/ConfirmDialog";
import {useDeleteAppointmentMutation} from "../store/query/appointment.query";
import {getRoleFromToken} from "../utils/utils";

export type BasicTableProp = {
    data: Appointment[];
    refetch: () => void;
}

export default function BasicTable({data, refetch}: BasicTableProp) {
    const isAdmin = getRoleFromToken();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const [appointment, setAppointment] = useState<Appointment | undefined>()
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | undefined>()
    const [open, setOpen] = useState<boolean>(false)
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)


    return (<>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Start</TableCell>
                            <TableCell align="left">End</TableCell>
                            <TableCell align="left">Doctor</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">{row.startDateTime}</TableCell>
                                <TableCell align="left">{row.endDateTime}</TableCell>
                                <TableCell align="left">{row.doctor?.firstName} {row.doctor?.lastName}</TableCell>
                                <TableCell align="left">
                                    <div>
                                        {
                                            isAdmin &&
                                            <>
                                                <Button onClick={() => {
                                                    setAppointment(row)
                                                    setOpen(true)
                                                }}
                                                >Edit</Button>
                                                <Button
                                                    onClick={() => {
                                                        setAppointmentToDelete(row)
                                                        setDeleteDialog(true)
                                                    }}
                                                >Delete</Button>
                                            </>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditAppointmentModal open={open} setOpen={setOpen} appointment={appointment} refetch={refetch}/>
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete appointment"
                description="Are you sure you want to delete appointment"
                onConfirm={() => {
                    appointmentToDelete?.id && deleteAppointment(appointmentToDelete?.id).then(() => {
                        refetch()
                    })
                }}
            />
        </>
    );
}