import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from "react-router-dom";
import {getRoleFromToken} from "../utils/utils";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function MainListItems() {
    const navigate = useNavigate();
    const isAdmin = getRoleFromToken();

    return <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <AccessAlarmsIcon/>
            </ListItemIcon>
            <ListItemText primary="Appointments" onClick={() => navigate("/appointments")}/>
        </ListItemButton>
        {isAdmin &&
        <ListItemButton>
            <ListItemIcon>
                <MedicationLiquidIcon/>
            </ListItemIcon>
            <ListItemText primary="Medicines" onClick={() => navigate("/medicines")}/>
        </ListItemButton>
        }
        <ListItemButton>
            <ListItemIcon>
                <ViewListIcon/>
            </ListItemIcon>
            <ListItemText primary="Prescriptions" onClick={() => navigate("/prescriptions")}/>
        </ListItemButton>
    </React.Fragment>
};