import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {Box, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import styled from "@emotion/styled";
import {Order, Prescription, User} from "../../types/auth/types";
import {useGetAllUsersQuery} from "../../store/query/appointment.query";
import {useCreatePrescriptionMutation, useUpdatePrescriptionMutation} from "../../store/query/prescription.query";
import {useGetAllMedicinesQuery} from "../../store/query/medicine.query";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import {number, object, string} from "yup";
import {useSnackbar} from "notistack";
import {FormattedMessage} from "react-intl";

export type EditManufacturerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    prescription?: Prescription;
    refetch: () => void;
}

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin: 8px;
  color: #333;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &[type="email"],
  &[type="password"] {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

let userSchema = object({
    description: string().required(),
    amount: number().required().positive(),
    doseGap: number().required().positive(),
    medicine: object({id: number().required().positive()}).required(),
});


export default function EditPrescriptionModal({open, setOpen, prescription, refetch}: EditManufacturerProps) {
    const [createPrescription] = useCreatePrescriptionMutation()
    const [updatePrescription] = useUpdatePrescriptionMutation()
    const {data: users} = useGetAllUsersQuery();
    const [patientEmail, setPatientEmail] = useState<string>("")
    const [orders, setOrders] = useState<Order[]>([])
    const {data: medicines} = useGetAllMedicinesQuery()
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (prop: Prescription) => {
        if (!patientEmail || orders.length == 0) {
            enqueueSnackbar(<FormattedMessage id="prescription_errorMessage"/>, {variant: "error"})
        }
        if (prescription && patientEmail) {
            await updatePrescription({
                id: prescription?.id,
                patient: {email: patientEmail},
                orders: orders
            }).then(() => {
                refetch();
                enqueueSnackbar(<FormattedMessage id="prescription_successMessage"/>, {variant: "success"})
                setOpen(false);
            });
        } else if (patientEmail) {
            await createPrescription({
                patient: {email: patientEmail},
                orders: orders
            }).then(() => {
                refetch();
                enqueueSnackbar(<FormattedMessage id="prescription_successMessage"/>, {variant: "success"})
                setOpen(false);
            });
        }
    };

    return (
        <Paper>
            <Formik
                initialValues={{} as Prescription}
                onSubmit={handleSubmit}>
                {props => (
                    <Form style={{
                        padding: '16px',
                        margin: '16px',
                    }}>
                        <Grid item xs={12}>
                            {
                                users && (
                                    <Select
                                        label={<FormattedMessage id="prescription_patient"/>}
                                        displayEmpty
                                        value={patientEmail}
                                        onChange={(value: SelectChangeEvent) => {
                                            setPatientEmail(value.target.value)
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            <em style={{color: 'grey'}}><FormattedMessage
                                                id="prescription_patient"/></em>
                                        </MenuItem>
                                        {users.map((user: User) => <MenuItem key={user.email}
                                                                             value={user.email}>{user.firstName} {user.lastName}</MenuItem>
                                        )}
                                    </Select>)
                            }
                        </Grid>
                        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '30px'}}>
                            <Box>
                                <Paper elevation={3}
                                       style={{
                                           padding: '16px',
                                           width: '20rem',
                                           height: '26rem',
                                           backgroundColor: '#FFF5EE'
                                       }}>
                                    <Label><FormattedMessage id="order_description"/></Label>
                                    <Input type="text" name="helperOrder.description"/>
                                    <Label><FormattedMessage id="order_amount"/></Label>
                                    <Input type="number" name="helperOrder.amount"/>
                                    <Label><FormattedMessage id="order_dose_gap"/></Label>
                                    <Input type="number" name="helperOrder.doseGap"/>
                                    <Label><FormattedMessage id="medicine"/></Label>
                                    <Grid item xs={3}>
                                        <Select defaultValue={-1}>
                                            <MenuItem value={-1} key={-1} disabled>
                                                <em style={{color: 'grey'}}><FormattedMessage id="medicine"/></em>
                                            </MenuItem>
                                            {medicines?.map(medicine => (
                                                <MenuItem key={medicine.id} value={medicine.id} onClick={() => {
                                                    props.setFieldValue("helperOrder.medicine.id", medicine.id)
                                                }}>
                                                    {medicine.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </Grid>
                                    <Button onClick={async () => {
                                        const isValid = await userSchema.isValid(props.values.helperOrder);
                                        if (!isValid) {
                                            enqueueSnackbar(<FormattedMessage
                                                id="order_errorMessage"/>, {variant: "error"})
                                        } else {
                                            if (props.values.helperOrder) {
                                                setOrders([...orders, props.values.helperOrder])
                                            }
                                        }
                                    }}><FormattedMessage id="order_add_order"/></Button>
                                </Paper>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                height: '26rem',
                                width: '100%',
                                overflowY: 'scroll'
                            }}>
                                <>
                                    {
                                        orders?.map(order =>
                                            <Paper key={order.id} elevation={1}
                                                   style={{padding: '16px', margin: '16px', height: '6rem'}}>
                                                <Typography variant="subtitle1">{order.description}</Typography>
                                                <Typography variant="body2"><FormattedMessage
                                                    id="order_amount"/>: {order.amount}</Typography>
                                                <Typography variant="body2"><FormattedMessage
                                                    id="order_dose_gap"/>: {order.doseGap}</Typography>
                                            </Paper>
                                        )
                                    }
                                    {
                                        orders.length == 0 && <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '50rem'
                                        }}> <DoNotDisturbAltIcon sx={{
                                            fontSize: 150
                                        }}/></Box>
                                    }
                                </>
                            </Box>
                        </Box>
                        <Button color="primary" type="submit" variant="contained"
                                sx={{marginTop: '2rem'}}><FormattedMessage id="submit"/></Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
}