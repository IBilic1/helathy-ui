import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Medicine} from "../../types/auth/types";
import {Button, TextField} from "@mui/material";
import EditMedicineModal from "./EditMedicineModal";
import ConfirmDialog from "../dialog/ConfirmDialog";
import {useDeleteMedicineMutation} from "../../store/query/medicine.query";

export type BasicTableProp = {
    data: Medicine[] | undefined;
    refetch: () => void;
}

export default function MedicineTable({data, refetch}: BasicTableProp) {
    const [deleteMedicine] = useDeleteMedicineMutation();
    const [medicine, setMedicine] = useState<Medicine | undefined>()
    const [medicineToDelete, setMedicineToDelete] = useState<Medicine | undefined>()
    const [open, setOpen] = useState<boolean>(false)
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (<>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">
                                    <div>
                                        {
                                            <>
                                                <Button onClick={() => {
                                                    setMedicine(row)
                                                    setOpen(true)
                                                }}
                                                >Edit</Button>
                                                <Button
                                                    onClick={() => {
                                                        setMedicineToDelete(row)
                                                        setDeleteDialog(true)
                                                    }}>
                                                    Delete
                                                </Button>
                                            </>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditMedicineModal open={open} setOpen={setOpen} medicine={medicine} refetch={refetch}/>
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete medicine"
                description="Are you sure you want to delete medicine"
                onConfirm={() => {
                    medicineToDelete?.id && deleteMedicine(medicineToDelete?.id).then(() => {
                        refetch()
                    })
                }}
            />
        </>
    );
}