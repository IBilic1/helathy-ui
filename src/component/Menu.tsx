import * as React from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import {useNavigate} from "react-router-dom";
import {useRole} from "../utils/utils";

export type MenuProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({setOpen}: MenuProps) {
    const navigate = useNavigate();
    const isAdmin = useRole();
    return <React.Fragment>
        <ListItemButton onClick={() => {
            navigate("/appointments");
            setOpen(false);
        }}>
            Appointments
        </ListItemButton>
        {isAdmin &&
            <ListItemButton onClick={() => {
                navigate("/medicines");
                setOpen(false);
            }}>
                Medicines
            </ListItemButton>
        }
        <ListItemButton onClick={() => {
            navigate("/prescriptions");
            setOpen(false);
        }}>
            Prescriptions
        </ListItemButton>
    </React.Fragment>
};