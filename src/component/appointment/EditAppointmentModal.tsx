import * as React from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Container, FormControl, FormLabel, Input, Modal, Option, Select, Sheet, Typography} from '@mui/joy';
import dayjs, {Dayjs} from "dayjs";
import {
    useCreateAppointmentMutation,
    useGetAllPatientsQuery,
    useUpdateAppointmentMutation
} from "../../store/query/appointment.query";
import {Appointment, User} from "../../types/auth/types";
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from "notistack";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import globalStyles from "./styles";

export type EditAppointmentModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    appointment?: Appointment;
    refetch: () => void;
};

const isSameOrBefore = (startTime: Date, endTime: Date) => {
    return dayjs(endTime).isAfter(dayjs(startTime));
}

const validationSchema = Yup.object({
    startDateTime: Yup.date()
        .required('Start time is required')
        .typeError('Invalid start time')
        .min(new Date(), 'Start time must be in the present or future'),
    endDateTime: Yup.date()
        .required('End time is required')
        .typeError('Invalid end time')
        .test(
            "startDateTime",
            "End time must be after start time",
            function () {
                const {endDateTime, startDateTime} = this.parent;
                return isSameOrBefore(startDateTime, endDateTime);
            }
        ),
    address: Yup.string().required('Address is required'),
    patientEmail: Yup.string()
        .email('Invalid email')
        .required('Patient email is required')
});

export default function EditAppointmentModal({open, setOpen, appointment, refetch}: EditAppointmentModalProps) {
    const snackbar = useSnackbar();
    const [start, setStart] = useState<Dayjs | null>(null);
    const [end, setEnd] = useState<Dayjs | null>(null);

    const [createAppointment] = useCreateAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();
    const {data: users} = useGetAllPatientsQuery();

    // Formik form handler
    const formik = useFormik({
        initialValues: {
            startDateTime: start?.format('YYYY-MM-DDTHH:mm'),
            endDateTime: end?.format('YYYY-MM-DDTHH:mm'),
            address: appointment?.address || '',
            patientEmail: appointment?.patient?.email || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (appointment) {
                await updateAppointment({
                    id: appointment.id,
                    startDateTime: values.startDateTime,
                    endDateTime: values.endDateTime,
                    address: values.address,
                    patient: {email: values.patientEmail} as User,
                }).then((value) => {
                    refetch();
                    setOpen(false);
                    const error = (value as { error?: FetchBaseQueryError })?.error?.data;
                    if (error && typeof error === 'string') {
                        snackbar.enqueueSnackbar(error, {variant: 'error'});
                    }
                });
            } else {
                await createAppointment({
                    startDateTime: values.startDateTime,
                    endDateTime: values.endDateTime,
                    address: values.address,
                    patient: {email: values.patientEmail} as User,
                }).then((value) => {
                    refetch();
                    setOpen(false);
                    const error = (value as { error?: FetchBaseQueryError })?.error?.data;
                    if (error && typeof error === 'string') {
                        snackbar.enqueueSnackbar(error, {variant: 'error'});
                    }
                });
            }
        }
    });

    React.useEffect(() => {
        if (appointment) {
            setStart(dayjs(appointment.startDateTime));
            setEnd(dayjs(appointment.endDateTime));
        }
    }, [appointment]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="edit-appointment-modal"
            aria-describedby="edit-appointment-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)',
            }}
        >
            <Container maxWidth="xs" sx={{bgcolor: 'background.body', p: 3, borderRadius: '8px', boxShadow: 'md'}}>
                <Typography component="h1" mb={2}>
                    <FormattedMessage id="appointment"/>
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Container>
                        <Sheet sx={globalStyles.sheet}>
                            <FormControl error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}>
                                <FormLabel><FormattedMessage id="start"/></FormLabel>
                                <Input
                                    name="startDateTime"
                                    type="datetime-local"
                                    value={formik.values.startDateTime}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                />
                                {formik.touched.startDateTime && formik.errors.startDateTime && (
                                    <Typography color="danger">{formik.errors.startDateTime}</Typography>
                                )}
                            </FormControl>
                        </Sheet>
                        <Sheet sx={globalStyles.sheet}>
                            <FormControl error={formik.touched.endDateTime && Boolean(formik.errors.endDateTime)}>
                                <FormLabel><FormattedMessage id="end"/></FormLabel>
                                <Input
                                    name="endDateTime"
                                    type="datetime-local"
                                    value={formik.values.endDateTime}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                />
                                {formik.touched.endDateTime && formik.errors.endDateTime && (
                                    <Typography color="danger">{formik.errors.endDateTime}</Typography>
                                )}
                            </FormControl>
                        </Sheet>
                        <Sheet sx={globalStyles.sheet}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="address"/></FormLabel>
                                <Input
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <Typography color="danger">{formik.errors.address}</Typography>
                                )}
                            </FormControl>
                        </Sheet>
                        <Sheet sx={globalStyles.sheet}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="prescription_patient"/></FormLabel>
                                {users && (
                                    <Select
                                        value={formik.values.patientEmail}
                                        onChange={(event, value) => formik.setFieldValue('patientEmail', value as string)}
                                        placeholder="Select a patient"
                                    >
                                        {users.map((user: User) => (
                                            <Option key={user.email} value={user.email}>
                                                {user.name}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                                {formik.touched.patientEmail && formik.errors.patientEmail && (
                                    <Typography color="danger">{formik.errors.patientEmail}</Typography>
                                )}
                            </FormControl>
                        </Sheet>
                    </Container>
                    <Button
                        type="submit"
                        fullWidth
                        variant="solid"
                        sx={{mt: 3}}
                    >
                        {appointment ? <FormattedMessage id="edit"/> : <FormattedMessage id="create"/>}
                    </Button>
                </form>
            </Container>
        </Modal>
    );
}
