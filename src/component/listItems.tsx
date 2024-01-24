import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useNavigate} from "react-router-dom";

export default function MainListItems() {
    const navigate = useNavigate();

    return <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Appointments" onClick={() => navigate("/appointments")}/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Medicines" onClick={() => navigate("/medicines")}/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Prescriptions" onClick={() => navigate("/prescriptions")}/>
        </ListItemButton>
    </React.Fragment>
};