import * as React from 'react';
import {useState} from 'react';

import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from "@mui/joy/Typography";
import {Button, Card, Option, Select} from "@mui/joy";
import {useGetAllUsersQuery} from "../../store/query/appointment.query";
import {useAuth} from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/auth/types";
import {useSystemUserRole} from "../../utils/utils";
import ChangeUserRoleModal from "./ChangeUserRoleModal";

export default function SystemUserPatients() {
    const auth = useAuth();
    const isSystemUser = useSystemUserRole();
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchRole, setSearchRole] = React.useState<'PATIENT' | 'DOCTOR' | 'NO ROLE' | null | undefined>(undefined);
    const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);
    const {data: users, refetch: refetchData} = useGetAllUsersQuery();

    // Filter data based on search term
    const filteredData = users?.filter((row) =>
        (row?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ) &&
        (row?.role === searchRole || (!row?.role && (searchRole === 'NO ROLE' || searchRole === null)))
    );

    React.useEffect(() => {
        if (!auth?.user || !isSystemUser) {
            navigate('/error')
        }
    }, [])


    return (
        <Card variant="outlined" sx={{p: 5}}>
            <Box sx={{mb: 3}}>
                <Typography level="h4">List of patients</Typography>
            </Box>
            <Input
                placeholder="Search by name or email"
                fullWidth
                sx={{mb: 2}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
                placeholder="Search by role"
                value={searchRole}
                onChange={(event, value) => setSearchRole(value)}
                sx={{width: '100%'}}
            >
                <Option value="DOCTOR">DOCTOR</Option>
                <Option value="PATIENT">PATIENT</Option>
                <Option value="NO ROLE">NO ROLE</Option>
            </Select>
            <Table aria-label="searchable table">
                <thead>
                <tr>
                    <th style={{width: '50%'}}>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredData?.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.role}</td>
                        <td>
                            <Button
                                onClick={() => {
                                    setSelectedUser(row);
                                    setOpen(true);
                                }}
                                variant="solid"
                            >
                                Change Role
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {
                open && <ChangeUserRoleModal user={selectedUser} open={open} setOpen={setOpen} refetch={refetchData}/>
            }
        </Card>
    );
}
