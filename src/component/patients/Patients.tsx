import * as React from 'react';

import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from "@mui/joy/Typography";
import {Card} from "@mui/joy";
import {useGetAllPatientsByDoctorQuery} from "../../store/query/appointment.query";
import {useAuth} from "../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {useAdminRole} from "../../utils/utils";

export default function Petients() {
    const isAdmin = useAdminRole();
    const auth = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const {data: users} = useGetAllPatientsByDoctorQuery();

    // Filter data based on search term
    const filteredData = users?.filter((row) =>
        row?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    React.useEffect(() => {
        if (!auth?.user || !isAdmin) {
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
            <Table aria-label="searchable table">
                <thead>
                <tr>
                    <th style={{width: '50%'}}>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {filteredData?.map((row, index) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    );
}
