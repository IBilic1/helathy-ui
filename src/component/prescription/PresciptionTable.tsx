import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import EditPrescriptionModal from "./EditPrescriptionModal";
import {useGetAllPrescriptionsQuery} from "../../store/query/prescription.query";
import PrescriptionAccordian from "./PrescriptionAccordian";
import {TextField} from "@mui/material";
import {FormattedMessage} from "react-intl";

export default function PresciptionTable() {
    const {data, refetch} = useGetAllPrescriptionsQuery();
    const [open, setOpen] = useState<boolean>(false)
    const [filterValue, setFilterValue] = useState<string>('');
    // Filter data based on the input value
    const filteredData = data?.filter(row =>
        row?.patient?.email.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (<>
            <EditPrescriptionModal open={open} setOpen={setOpen} refetch={refetch}/>
            <Paper sx={{
                height: '26rem',
                width: '100%',
                overflowY: 'scroll'
            }}>
                <TextField
                    label={<FormattedMessage id="prescription_filter"/>}
                    variant="outlined"
                    style={{margin: '1rem'}}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                {(filterValue ? filteredData : data)?.map((row) => (
                    <PrescriptionAccordian prescription={row} refetch={refetch}/>
                ))}
            </Paper>
        </>
    );
}