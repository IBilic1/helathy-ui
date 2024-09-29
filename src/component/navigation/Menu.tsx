import * as React from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import {useNavigate} from "react-router-dom";
import {useAdminRole, useSystemUserRole} from "../../utils/utils";

export type MenuProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({setOpen}: MenuProps) {
    const navigate = useNavigate();
    const isAdmin = useAdminRole();
    const isSystemUser = useSystemUserRole();

    return <React.Fragment>
        {!isSystemUser &&
            <>
                <ListItemButton onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                }}>
                    Profile
                </ListItemButton>
                <ListItemButton onClick={() => {
                    navigate("/appointments");
                    setOpen(false);
                }}>
                    Appointments
                </ListItemButton>
            </>
        }
        {isAdmin &&
            <ListItemButton onClick={() => {
                navigate("/patients");
                setOpen(false);
            }}>
                Patients
            </ListItemButton>
        }
        {isSystemUser &&
            <ListItemButton onClick={() => {
                navigate("/patients-edit");
                setOpen(false);
            }}>
                Patients
            </ListItemButton>
        }
    </React.Fragment>
}