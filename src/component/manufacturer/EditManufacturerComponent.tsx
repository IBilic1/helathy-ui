import * as React from 'react';
import Button from '@mui/material/Button';
import {Container, Modal} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {Manufacturer} from "../../types/auth/types";
import styled from "@emotion/styled";
import {useCreateManufacturerMutation, useUpdateManufacturerMutation} from "../../store/query/manufacturer.query";
import {object, string} from 'yup';
import {useSnackbar} from "notistack";
import {FormattedMessage} from "react-intl";

let userSchema = object({
    name: string().required(),
    address: string().required(),
});

export type EditManufacturerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    manufacturer?: Manufacturer;
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

export default function EditManufacturerComponent({open, setOpen, manufacturer, refetch}: EditManufacturerProps) {
    const [createManufacturer] = useCreateManufacturerMutation()
    const [updateManufacturer] = useUpdateManufacturerMutation()
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (prop: Manufacturer) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar(<FormattedMessage id="prescription_errorMessage"/>, {variant: "error"})
        } else {
            if (manufacturer) {
                await updateManufacturer({
                    id: manufacturer?.id,
                    name: prop.name,
                    address: prop.address,
                })
                refetch()
                enqueueSnackbar(<FormattedMessage id="prescription_successMessage"/>, {variant: "success"})
                setOpen(false)
            } else {
                await createManufacturer({
                    name: prop.name,
                    address: prop.address,
                })
                refetch()
                enqueueSnackbar(<FormattedMessage id="prescription_successMessage"/>, {variant: "success"})
                setOpen(false)
            }
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
                <Formik
                    initialValues={{name: manufacturer?.name, address: manufacturer?.address} as Manufacturer}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <Label htmlFor="name"><FormattedMessage id="manufacturer_name"/></Label>
                            <Input id="name" name="name" label={<FormattedMessage id="manufacturer_name"/>} isRequired={true}
                                   fontSize='sm'
                                   ms={{base: "0px", md: "0px"}}
                                   mb='24px'
                                   fontWeight='500'
                                   size='lg'/>
                            <Label htmlFor="address"><FormattedMessage id="address"/></Label>
                            <Input id="address" name="address" label={<FormattedMessage id="address"/>}
                                   isRequired={true}
                                   fontSize='sm'
                                   ms={{base: "0px", md: "0px"}}
                                   mb='24px'
                                   fontWeight='500'
                                   size='lg'/>
                            <Button type="submit" color="primary" variant="contained"
                                    sx={{marginTop: '1rem', marginBottom: '1rem'}}><FormattedMessage
                                id="submit"/></Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Modal>
    );
}