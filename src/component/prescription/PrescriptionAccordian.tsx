import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Prescription} from "../../types/auth/types";
import {FormattedMessage} from "react-intl";

export type PrescriptionAccordionProps = {
    prescription: Prescription;
    refetch: () => void;
}

const PrescriptionAccordion = ({prescription, refetch}: PrescriptionAccordionProps) => {
    return (
        <Accordion sx={{
            margin: '1rem',
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    <FormattedMessage id="prescription"/> {prescription.id}: {prescription?.patient?.email}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <FormattedMessage id="prescription_patient"/>: {prescription?.patient?.email}
                    <br/>
                    <FormattedMessage id="doctor"/>: {prescription?.doctor?.email}
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
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default PrescriptionAccordion;
