import * as React from 'react';
import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from "@mui/joy/Typography";
import {Card, Sheet} from "@mui/joy";

const initialData = [
    { name: 'Jane Doe', email: 'jane.doe@example.com' },
    { name: 'John Smith', email: 'john.smith@example.com' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    // Add more data as needed
];

export default function Petients() {
    const [searchTerm, setSearchTerm] = React.useState('');

    // Filter data based on search term
    const filteredData = initialData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card variant="outlined" sx={{ p: 5 }}>
            <Box sx={{mb: 3}}>
                <Typography level="h4">List of patients</Typography>
            </Box>
            <Input
                placeholder="Search by name or email"
                fullWidth
                sx={{ mb: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table aria-label="searchable table">
                <thead>
                <tr>
                    <th style={{ width: '50%' }}>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row, index) => (
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
