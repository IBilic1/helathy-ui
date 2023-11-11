import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Container, MenuItem, Modal, Select, SelectChangeEvent} from '@mui/material';
import TextField from "@mui/material/TextField";
import {DateTimePicker} from "@mui/x-date-pickers";
import {
    useCreateAppointmentMutation,
    useGetAllUsersQuery,
    useUpdateAppointmentMutation
} from "../store/query/appointment.query";
import moment from "moment";
import {Appointment, User} from "../types/auth/types";
import dayjs, {Dayjs} from "dayjs";

export type EditAppointmentModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    appointment?: Appointment;
    refetch: () => void;
}

export default function EditAppointmentModal({open, setOpen, appointment, refetch}: EditAppointmentModalProps) {
    const [createAppoinment] = useCreateAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const {data: users} = useGetAllUsersQuery();
    const [start, setStart] = useState<Dayjs | undefined | null>(null)
    const [end, setEnd] = useState<Dayjs | undefined | null>(null)
    const [patientEmail, setPatientEmail] = useState<string | undefined>()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (appointment) {
            await updateAppointment(
                {
                    id: appointment?.id,
                    startDateTime: start?.toISOString() ?? moment().toISOString(),
                    endDateTime: end?.toISOString() ?? moment().toISOString(),
                    address: data.get('address') as string,
                    patient: {
                        id: undefined,
                        firstName: undefined,
                        lastName: undefined,
                        email: patientEmail
                    } as User
                }).then(() => {
                refetch()
                setOpen(false)
            })
        } else {
            await createAppoinment(
                {
                    startDateTime: start?.toISOString() ?? moment().toISOString(),
                    endDateTime: end?.toISOString() ?? moment().toISOString(),
                    address: data.get('address') as string,
                    patient: {email: patientEmail} as User,
                }).then(() => {
                refetch()
                setOpen(false)
            })
        }

    };
    React.useEffect(() => {
        if (appointment) {
            setPatientEmail(appointment?.patient?.email)
            setEnd(dayjs(appointment.endDateTime))
            setStart(dayjs(appointment.startDateTime))
        }
    }, [appointment, users])

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container component="main" maxWidth="xs" style={{
                background: '#f2f6fc', borderRadius: '2px'
            }}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Appointment
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker
                                    label="Start"
                                    value={start}
                                    onChange={(value: Dayjs | null) => setStart(value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker
                                    label="End"
                                    value={end}
                                    onChange={(value: Dayjs | null) => setEnd(value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    defaultValue={appointment?.address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    ((users && patientEmail) || (users && !appointment)) &&
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Patient"
                                        value={patientEmail}
                                        onChange={(value: SelectChangeEvent) => {
                                            setPatientEmail(value.target.value)
                                        }}
                                    >
                                        {users.map((user: User) => <MenuItem key={user.email}
                                                                             value={user.email}>{user.firstName} {user.lastName}</MenuItem>
                                        )}
                                    </Select>
                                }
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            {appointment ? 'Update' : 'Create'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Modal>
    );
}