import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Prescription} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import {getRoleFromToken} from "../../utils/utils";
import {useDeletePrescriptionMutation} from "../../store/query/prescription.query";
import {FormattedMessage} from "react-intl";

export type PrescriptionAccordionProps = {
    prescription: Prescription;
    refetch: () => void;
}

const PrescriptionAccordion = ({prescription, refetch}: PrescriptionAccordionProps) => {
    const [prescriptionToUpdate, setPrescriptionToUpdate] = useState<Prescription | undefined>()
    const [prescriptionToDelete, setPrescriptionToDelete] = useState<Prescription | undefined>()
    const [open, setOpen] = useState<boolean>(false)
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)
    const isAdmin = getRoleFromToken();
    const [deletePrescription] = useDeletePrescriptionMutation();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                   <FormattedMessage id="prescription"/> {prescription.id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Patient: {prescription?.patient?.email}
                    <br/>
                    Doctor: {prescription?.doctor?.email}
                </Typography>
                {prescription.orders.map((order) => (
                    <Accordion key={order.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`panel-${order.id}-content`}
                            id={`panel-${order.id}-header`}
                        >
                            <Typography><FormattedMessage id="prescription"/> ID: {order.id}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <FormattedMessage id="order_description"/>: {order.description}
                                <br/>
                                <FormattedMessage id="order_amount"/>: {order.amount}
                                <br/>
                                <FormattedMessage id="order_dose_gap"/>: {order.doseGap}
                                {/* Add more details if needed */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete prescription"
                description="Are you sure you want to delete prescription"
                onConfirm={() => {
                    prescriptionToDelete?.id && deletePrescription(prescriptionToDelete?.id).then(() => {
                        refetch()
                    })
                }}
            />
        </Accordion>
    );
};

export default PrescriptionAccordion;
