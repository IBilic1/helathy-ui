import * as React from "react";
import {useState} from "react";
import {Box, Button, Card, CardContent, Paper, Typography} from "@mui/material";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import AppointmentTable from "./AppointmentTable";
import EditAppointmentModal from "../manufacturer/EditAppointmentModal";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useGetAppointmentsByDoctorQuery} from "../../store/query/appointment.query";
import {Appointment} from "../../types/auth/types";
import SelectedDate from "../calnedar/SelectedDate";
import dayjs, {Dayjs} from "dayjs";
import {useRole} from "../../utils/utils";
import {FormattedMessage} from "react-intl";
import globalStyles from "../styles";

const styles = {
    container: {display: 'flex', width: '100%'},
    paper: {marginTop: '1.5rem', padding: '1rem'},
    paperContainer: {display: 'flex', justifyContent: "end"},
    card: {width: '100%', marginLeft: '1.5rem'},
    cardFontSize: {fontSize: 23},
    cardMargin: {mb: 1.5},
};

export default function Appointments() {
    const isAdmin = useRole();
    const {data, refetch} = useGetAppointmentsByDoctorQuery();
    const [open, setOpen] = useState<boolean>(false)
    const [highlightedDays, setHighlightedDays] = useState<number[] | undefined>()
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>()
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
                dayjs(app.endDateTime).date() === selectedDay?.date()
            )
            setSelectedAppointment(filteredDataByDate && filteredDataByDate[0])
        }

    }, [selectedDay])

    React.useEffect(() => {
        if (open) {
            refetch()
        }
    }, [open])

    return <>
        <div>
            <Box sx={styles.container}>
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
                        onChange={(value => setSelectedDay(value))}
                    />
                </Paper>
                <Card sx={styles.card}>
                    {
                        selectedAppointment ?
                            (<CardContent sx={globalStyles.mediumHeight}>
                                <Typography sx={styles.cardFontSize} color="text.secondary" gutterBottom>
                                    <LocalHospitalIcon fontSize="large"/>
                                </Typography>
                                <Typography variant="h5" component="div"></Typography>
                                <Typography sx={styles.cardMargin} color="text.secondary">
                                    {selectedAppointment?.doctor?.name} {selectedAppointment?.doctor?.name}
                                </Typography>
                                <Typography variant="h5">
                                    <FormattedMessage id="address"/>: {selectedAppointment?.address}
                                </Typography>
                                <Typography variant="body2">
                                    <br/>
                                    <FormattedMessage id="appointments_description"/>
                                </Typography>
                            </CardContent>)
                            : (
                                <Box sx={globalStyles.centerContainer}>
                                    <FormattedMessage id="appointmentIsNotSelected"/>
                                </Box>
                            )
                    }

                </Card>
            </Box>
            <Paper sx={styles.paper}>
                <Box sx={styles.paperContainer}>
                    {
                        isAdmin &&
                        <Button variant='contained' type='submit' onClick={() => setOpen(true)}><FormattedMessage
                            id="appointments_create_appointment"/></Button>
                    }
                </Box>
                {data && <AppointmentTable data={data} refetch={refetchData}/>}
                {
                    !data &&
                    (
                        <Box sx={globalStyles.centerContainer}>
                            <FormattedMessage id="appointments_do_not_exists"/>
                        </Box>
                    )
                }
            </Paper>
        </div>
        {open && <EditAppointmentModal open={open} setOpen={setOpen} refetch={refetchData}/>}
    </>
}