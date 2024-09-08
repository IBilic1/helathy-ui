import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDeleteManufacturerMutation, useGetAllManufacturersQuery} from "../../store/query/manufacturer.query";
import {Button} from "@mui/material";
import {useRole} from "../../utils/utils";
import {Manufacturer} from "../../types/auth/types";
import EditManufacturerComponent from "./EditManufacturerComponent";
import ConfirmDialog from "../dialog/ConfirmDialog";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import {FormattedMessage} from "react-intl";

export default function Manufacturers() {
    const isAdmin = useRole();
    const {data, refetch} = useGetAllManufacturersQuery()
    const [deleteManufacturer] = useDeleteManufacturerMutation();
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>()
    const [manufacturerToDelete, setManufacturerToDelete] = useState<Manufacturer | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)


    return (
        <Box sx={{flexGrow: 1}}>
            <Grid item xs={12} md={6}>

                <Box sx={{display: 'flex', justifyContent: "end"}}>
                    {
                        isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                            <FormattedMessage id="create_manufacturer"/></Button>
                    }
                </Box>
                <Box>
                    <List>
                        {data?.map(manufacturer => {
                            return <ListItem
                                sx={{
                                    border: '0.5px solid #cd3d6f',
                                    borderRadius: '2%',
                                    marginTop: '1rem'
                                }}
                                secondaryAction={
                                    <>
                                        <IconButton>
                                            <DeleteIcon onClick={() => {
                                                setManufacturerToDelete(manufacturer)
                                                setDeleteDialog(true)
                                            }}/>
                                        </IconButton>
                                        <IconButton>
                                            <EditIcon onClick={() => {
                                                setManufacturer(manufacturer)
                                                setOpenEdit(true)
                                            }}/>
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PrecisionManufacturingIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={manufacturer.name}
                                />
                            </ListItem>
                        })}
                    </List>
                </Box>
            </Grid>
            {openEdit &&
            <EditManufacturerComponent open={openEdit} manufacturer={manufacturer} setOpen={setOpenEdit}
                                       refetch={refetch}/>}
            {open &&
            <EditManufacturerComponent open={open} setOpen={setOpen} refetch={refetch}/>}
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete manufacturer"
                description="Are you sure you want to delete manufacturer"
                onConfirm={() => {
                    manufacturerToDelete?.id && deleteManufacturer(manufacturerToDelete?.id).then(() => {
                        refetch()
                    })
                }}
            />
        </Box>
    );
}