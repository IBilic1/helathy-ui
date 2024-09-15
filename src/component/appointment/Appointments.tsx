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
import {useRole} from "../../utils/utils";
import {FormattedMessage} from "react-intl";
import globalStyles from "../styles";
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
                                            // Styles for the header containing month-year, and navigation arrows
                                            '& .MuiPickersCalendarHeader-root': {
                                                color: '#3479E8', // Ensure text is white (or light) for dark mode
                                            },
                                            // Styles for the weekday labels
                                            '& .MuiDayCalendar-weekDayLabel': {
                                                color: '#3479E8', // Light grey for weekday labels
                                            },
                                            // Styles for the arrows for month navigation
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#3479E8', // Make month-year text white
                                            },
                                            '& .MuiPickersArrowSwitcher-root button': {
                                                color: '#3479E8', // Make navigation arrows white
                                            },
                                            '& .MuiPickersCalendarHeader-switchViewButton': {
                                                color: '#3479E8', // Make navigation arrows white
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
                                <Typography sx={styles.cardFontSize} color="neutral" gutterBottom>
                                    <LocalHospitalIcon fontSize="large"/>
                                </Typography>
                                <Typography variant="solid" component="div"></Typography>
                                <Typography sx={styles.cardMargin} color="neutral">
                                    {selectedAppointment?.doctor?.name} {selectedAppointment?.doctor?.name}
                                </Typography>
                                <Typography variant="solid">
                                    <FormattedMessage id="address"/>: {selectedAppointment?.address}
                                </Typography>
                                <Typography variant="solid">
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
                {data && <AppointmentTable data={data} refetch={refetchData}/>}
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