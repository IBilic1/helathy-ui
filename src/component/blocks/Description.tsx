/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../navigation/TwoSidedLayout';
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

export default function Description() {
    const navigation = useNavigate();
    return (
        <TwoSidedLayout>
            <Typography color="primary" sx={{fontSize: 'lg', fontWeight: 'lg'}}>
                <FormattedMessage id={"manage_your_appointments_with_ease"}/>
            </Typography>
            <Typography
                level="h1"
                sx={{
                    fontWeight: 'xl',
                    fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
                }}
            >
                <FormattedMessage id={"simplify_your_healthcare"}/>
            </Typography>
            <Typography
                textColor="text.secondary"
                sx={{fontSize: 'lg', lineHeight: 'lg'}}
            >
                <FormattedMessage id={"book_track_manage"}/>
            </Typography>
            <Button size="lg" endDecorator={<ArrowForward fontSize="large"/>} onClick={() => navigation('/login')}>
                Get Started
            </Button>
        </TwoSidedLayout>
    );
}
