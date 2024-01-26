import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import EditPrescriptionModal from "./EditPrescriptionModal";
import {useGetAllPrescriptionsQuery} from "../../store/query/prescription.query";
import PrescriptionAccordian from "./PrescriptionAccordian";
import {Box, TextField} from "@mui/material";
import {FormattedMessage} from "react-intl";
import {getRoleFromToken} from "../../utils/utils";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

export default function PresciptionTable() {
    const isAdmin = getRoleFromToken();
    const {data, refetch} = useGetAllPrescriptionsQuery();
    const [open, setOpen] = useState<boolean>(false)
    const [filterValue, setFilterValue] = useState<string>('');
    // Filter data based on the input value
    const filteredData = data?.filter(row =>
        row?.patient?.email.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (<>
            {isAdmin &&
            <EditPrescriptionModal open={open} setOpen={setOpen} refetch={refetch}/>}
            <Paper sx={{
                height: isAdmin ? '26rem' : '70vh',
                width: '100%',
                overflowY: 'scroll'
                , backgroundColor: '#EDEEF3'
            }}>
                {isAdmin &&
                <TextField
                    label={<FormattedMessage id="prescription_filter"/>}
                    variant="outlined"
                    style={{margin: '1rem'}}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />}
                {(filterValue ? filteredData : data)?.map((row) => (
                    <PrescriptionAccordian prescription={row} refetch={refetch}/>
                ))}
                {
                    (!data || !filteredData) && <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}> <DoNotDisturbAltIcon sx={{
                        fontSize: 150
                    }} aria-label="No data"/>No data</Box>
                }
            </Paper>
        </>
    );
}