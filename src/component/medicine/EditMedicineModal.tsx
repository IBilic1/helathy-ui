import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Container, MenuItem, Modal, Select} from '@mui/material';
import TextField from "@mui/material/TextField";
import {useCreateMedicineMutation, useUpdateMedicineMutation} from "../../store/query/medicine.query";
import {Medicine} from "../../types/auth/types";
import {useGetAllManufacturersQuery} from "../../store/query/manufacturer.query";
import {useSnackbar} from "notistack";
import {FormattedMessage} from "react-intl";

export type EditMedicineModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    medicine?: Medicine;
    refetch: () => void;
}

export default function EditMedicineModal({open, setOpen, medicine, refetch}: EditMedicineModalProps) {
    const [createMedicine] = useCreateMedicineMutation();
    const [updateMedicine] = useUpdateMedicineMutation();
    const {data: manufacturers} = useGetAllManufacturersQuery()
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const manufacturerId = Number(data.get('manufacturerId') as string);
        if (name && description && manufacturerId != -1) {
            if (medicine) {
                await updateMedicine(
                    {
                        id: medicine?.id,
                        name: data.get('name') as string,
                        description: data.get('description') as string,
                        manufacturerId: Number(data.get('manufacturerId') as string),
                    }).then(() => {
                    refetch()
                    enqueueSnackbar(<FormattedMessage id="medicine_successMessage" />, {variant: "success"})
                    setOpen(false)
                })
            } else {
                await createMedicine(
                    {
                        name: data.get('name') as string,
                        description: data.get('description') as string,
                        manufacturerId: Number(data.get('manufacturerId') as string),
                    }).then(() => {
                    refetch()
                    enqueueSnackbar(<FormattedMessage id="medicine_successMessage" />, {variant: "success"})
                    setOpen(false)
                })
            }
        } else {
            enqueueSnackbar(<FormattedMessage id="medicine_errorMessage" />, {variant: "error"})
        }
    };

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
                        <FormattedMessage id="medicine" />
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label={<FormattedMessage id="medicine_name" />}
                                    name="name"
                                    defaultValue={medicine?.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label={<FormattedMessage id="medicine_description" />}
                                    name="description"
                                    defaultValue={medicine?.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select name="manufacturerId" defaultValue={-1}>
                                    <MenuItem value={-1} key={-1} disabled>
                                        <em style={{color:'grey'}}><FormattedMessage id="medicine_manufacturer" /></em>
                                    </MenuItem>
                                    {manufacturers?.map(manufacturer => (
                                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            {medicine ? <FormattedMessage id="update" /> : <FormattedMessage id="create" />}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Modal>
    );
}