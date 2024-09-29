import * as React from 'react';

import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from "@mui/joy/Typography";
import {Button, Card, Select} from "@mui/joy";
import Option from '@mui/joy/Option';
import {useChangeRoleMutation, useGetAllUsersQuery} from "../../store/query/appointment.query";
import {useAuth} from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/auth/types";
import {useSnackbar} from "notistack";

export default function SystemUserPatients() {
    const auth = useAuth();
    const navigate = useNavigate();
    const snackbar = useSnackbar();

    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedRole, setSelectedRole] = React.useState<'USER' | 'ADMIN' | undefined>(undefined);
    const [changeRole, {isError, isSuccess}] = useChangeRoleMutation();
    const {data: users} = useGetAllUsersQuery();

    // Filter data based on search term
    const filteredData = users?.filter((row) =>
        row?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    React.useEffect(() => {
        if (!auth?.user) {
            navigate('/error')
        }
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            snackbar.enqueueSnackbar('Role successfully changed', {variant: 'success'})
        }
    }, [isSuccess])

    React.useEffect(() => {
        if (isError) {
            snackbar.enqueueSnackbar('Error occurred while changing role', {variant: 'error'})
        }
    }, [isError])

    const onChange = (user: User, role: 'ADMIN' | 'USER' | undefined) => {
        changeRole({...user, role})
    };

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
                        <td>
                            <Select
                                defaultValue={row.role}
                                onChange={(event, value) => {
                                    const newRole = value as string;
                                    if (newRole === 'ADMIN') {
                                        setSelectedRole('ADMIN')
                                    } else if (newRole === 'USER') {
                                        setSelectedRole('USER')
                                    }
                                }}
                                sx={{width: '100%'}}
                            >
                                <Option value="ADMIN">Admin</Option>
                                <Option value="USER">User</Option>
                            </Select>
                        </td>
                        <td>
                            <Button
                                onClick={() => onChange(row, selectedRole)}
                                variant="solid"
                            >
                                Change Role
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    );
}
