import * as React from 'react';
import {useFormik} from 'formik';
import {Button, Container, Input, Modal, Option, Select, Sheet, Typography} from '@mui/joy';
import {User} from "../../types/auth/types";
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from "notistack";
import {useChangeRoleMutation} from "../../store/query/appointment.query";

export type ChangeUserModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user?: User;
    refetch: () => void;
};


export default function ChangeUserRoleModal({user, refetch, setOpen, open}: ChangeUserModalProps) {
    const snackbar = useSnackbar();
    const [changeRole, {isError, isSuccess}] = useChangeRoleMutation();

    // Formik form handler
    const formik = useFormik({
        initialValues: {
            role: user?.role,
            email: user?.email
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            changeRole({...user, role: values.role})
        }
    });

    React.useEffect(() => {
        if (isSuccess) {
            snackbar.enqueueSnackbar('Role successfully changed', {variant: 'success'})
            refetch();
            setOpen(false);
        }
    }, [isSuccess])

    React.useEffect(() => {
        if (isError) {
            snackbar.enqueueSnackbar('Error occurred while changing role', {variant: 'error'})
        }
    }, [isError])

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
                    <FormattedMessage id="prescription_patient"/>
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Sheet>
                        <Input
                            name="email"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            fullWidth
                            disabled
                        />
                    </Sheet>
                    <Sheet sx={{
                        marginTop: 2,
                    }}>
                        <Select
                            value={formik.values.role}
                            onChange={(event, value) => formik.setFieldValue('role', value as string)}
                            sx={{width: '100%'}}
                        >
                            <Option value="DOCTOR">DOCTOR</Option>
                            <Option value="PATIENT">PATIENT</Option>
                        </Select>
                    </Sheet>
                    <Button
                        type="submit"
                        fullWidth
                        variant="solid"
                        sx={{mt: 3}}
                    >
                        <FormattedMessage id="edit"/>
                    </Button>
                </form>
            </Container>
        </Modal>
    );
}
