import * as React from "react";
import {useState} from "react";
import {Box, Button, Card, CardActions, CardContent, Paper, Typography} from "@mui/material";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import BasicTable from "./BasicTable";
import EditAppointmentModal from "./EditAppointmentModal";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useGetAppointmentsByDoctorQuery, useGetAppointmentsByUserQuery} from "../store/query/appointment.query";
import {Appointment} from "../types/auth/types";
import SelectedDate from "./calnedar/SelectedDate";
import dayjs, {Dayjs} from "dayjs";
import {getRoleFromToken} from "../utils/utils";


export default function Demo() {
    const isAdmin = getRoleFromToken();
    const {data, refetch} = useGetAppointmentsByDoctorQuery();
    const [open, setOpen] = useState<boolean>(false)
    const [highlightedDays, setHighlightedDays] = useState<number[] | undefined>()
    const [setelctedDay, setSetelctedDay] = useState<Dayjs | null>()
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>()
    const refetchData = () => {
        refetch()
    }

    React.useEffect(() => {
        if (data) {
            setHighlightedDays(data.map((date: Appointment) => {
                return dayjs(date.endDateTime).date()
            }))
        }
    }, [data])

    React.useEffect(() => {
        if (data) {
            const filteredDataByDate = data.filter((app: Appointment) =>
                dayjs(app.endDateTime).date() === setelctedDay?.date()
            )
            setSelectedAppointment(filteredDataByDate && filteredDataByDate[0])
        }

    }, [setelctedDay])

    React.useEffect(() => {
        if (open) {
            refetch()
        }
    }, [open])

    return <>
        <div>
            <Box sx={{display: 'flex', width: '100%'}}>
                <Paper>
                    <DateCalendar
                        slots={{
                            day: SelectedDate
                        }}
                        slotProps={{
                            day: {
                                highlightedDays
                            } as any
                        }}
                        onChange={(value => setSetelctedDay(value))}
                    />
                </Paper>
                <Card sx={{width: '100%', marginLeft: '1.5rem'}}>
                    <CardContent sx={{height: '80%'}}>
                        <Typography sx={{fontSize: 23}} color="text.secondary" gutterBottom>
                            <LocalHospitalIcon fontSize="large"/>
                        </Typography>
                        <Typography variant="h5" component="div"></Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {selectedAppointment?.doctor?.firstName} {selectedAppointment?.doctor?.lastName}
                        </Typography>
                        <Typography variant="h5">
                            Address: {selectedAppointment?.address}
                        </Typography>
                        <Typography variant="body2">
                            <br/>
                            {'To reschedule your appointment, please contact our office at [Phone Number] or r' +
                            'eply to this email with your preferred date and time. If you have any specific topics ' +
                            'or quest ions you\'' +
                            'd like to discuss during your appointment, please feel free to let us know in advance.'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="large">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
            <Paper sx={{marginTop: '1.5rem', padding: '1rem'}}>
                <Box sx={{display: 'flex', justifyContent: "end"}}>
                    {
                        isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>Create
                            appointment</Button>
                    }
                </Box>
                {data && <BasicTable data={data} refetch={refetchData}/>}
            </Paper>
        </div>
        {open && <EditAppointmentModal open={open} setOpen={setOpen} refetch={refetchData}/>}
    </>
}