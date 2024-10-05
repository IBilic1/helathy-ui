import * as React from "react";
import {useState} from "react";
import {Box, Button, Card, CardContent, Sheet, Typography} from "@mui/joy";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import AppointmentTable from "./AppointmentTable";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useGetAppointmentsByDoctorQuery} from "../../store/query/appointment.query";
import {Appointment} from "../../types/auth/types";
import SelectedDate from "../calnedar/SelectedDate";
import dayjs, {Dayjs} from "dayjs";
import {useAdminRole} from "../../utils/utils";
import {FormattedMessage} from "react-intl";
import globalStyles from "./styles";
import framesxTheme from "../../theme";
import {CssVarsProvider} from "@mui/joy/styles";
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as extendMaterialTheme,
    THEME_ID
} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import EditAppointmentModal from "./EditAppointmentModal";
import {useAuth} from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";

const styles = {
    container: {display: 'flex', width: '100%'},
    paper: {marginTop: '1.5rem', padding: '1rem'},
    paperContainer: {display: 'flex', justifyContent: "end"},
    card: {width: '100%', marginLeft: '1.5rem'},
    cardFontSize: {fontSize: 23},
    cardMargin: {mb: 1.5},
    margin: {paddingTop: 10},
};

export default function Appointments() {
    const isAdmin = useAdminRole();
    const auth = useAuth();
    const navigate = useNavigate();
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
            setSelectedDay(dayjs())
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

    React.useEffect(() => {
        if (!auth?.user) {
            navigate('/error')
        }
    }, [])

    const materialTheme = extendMaterialTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: '#3479E8',
                    },
                    background: {
                        default: '#3479E8',
                        paper: '#3479E8',
                    },
                    text: {
                        primary: '#3479E8',
                        secondary: '#3479E8',
                    },
                },
            },
        },
    });

    return <Box sx={styles.margin}>
        <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
            <Box sx={styles.container}>
                <Sheet variant="outlined">
                    <MaterialCssVarsProvider theme={{[THEME_ID]: materialTheme}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                slots={{
                                    day: SelectedDate
                                }}
                                slotProps={{
                                    calendarHeader: {
                                        sx: {
                                            '& .MuiPickersCalendarHeader-root': {
                                                color: '#3479E8',
                                            },
                                            '& .MuiDayCalendar-weekDayLabel': {
                                                color: '#3479E8',
                                            },
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#3479E8',
                                            },
                                            '& .MuiPickersArrowSwitcher-root button': {
                                                color: '#3479E8',
                                            },
                                            '& .MuiPickersCalendarHeader-switchViewButton': {
                                                color: '#3479E8',
                                            },
                                        },
                                    },
                                    day: {
                                        highlightedDays,
                                    } as any,
                                }}
                                onChange={(value => setSelectedDay(value))}
                            />
                        </LocalizationProvider>
                    </MaterialCssVarsProvider>
                </Sheet>
                <Card sx={styles.card}>
                    {
                        selectedAppointment ?
                            (<CardContent sx={globalStyles.mediumHeight}>
                                <Typography sx={styles.cardFontSize} color="primary" gutterBottom>
                                    <LocalHospitalIcon fontSize="large"/>
                                </Typography>
                                <Typography sx={styles.cardMargin} variant="soft">
                                    <FormattedMessage
                                        id="doctor"/> {selectedAppointment?.doctor?.name}
                                </Typography>
                                <Typography sx={styles.cardMargin} variant="soft">
                                    <FormattedMessage  id="appointment_patient"/> {selectedAppointment?.patient?.name}
                                </Typography>
                                <Typography variant="soft">
                                    <FormattedMessage id="address"/>: {selectedAppointment?.address}
                                </Typography>
                                <Typography>
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
            <Sheet sx={styles.paper} variant="outlined">
                <Box sx={styles.paperContainer}>
                    {
                        isAdmin &&
                        <Button variant='solid' type='submit' onClick={() => setOpen(true)}><FormattedMessage
                            id="appointments_create_appointment"/></Button>
                    }
                </Box>
                {data && <AppointmentTable selectedDay={selectedDay} data={data} refetch={refetchData}/>}
                {
                    !data &&
                    (
                        <Box sx={globalStyles.centerContainer}>
                            <FormattedMessage id="appointments_do_not_exists"/>
                        </Box>
                    )
                }
            </Sheet>
        </CssVarsProvider>
        {
            open && <EditAppointmentModal open={open} setOpen={setOpen} refetch={refetchData}/>
        }
    </Box>
}