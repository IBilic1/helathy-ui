import * as React from 'react';
import Typography from '@mui/joy/Typography';
import TwoSidedLayout from '../navigation/TwoSidedLayout';
import {FormattedMessage} from 'react-intl';

export default function DoctorAuthorization() {
    return (
        <TwoSidedLayout>
            <Typography color="primary" sx={{fontSize: 'lg', fontWeight: 'lg'}}>
                <FormattedMessage id="the_power_to_do_more"/>
            </Typography>
            <Typography
                level="h1"
                sx={{
                    fontWeight: 'xl',
                    fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
                }}
            >
                <FormattedMessage id="secure_and_trusted_healthcare_management"/>
            </Typography>
            <Typography
                textColor="text.secondary"
                sx={{fontSize: 'lg', lineHeight: 'lg'}}
            >
                <FormattedMessage id="internal_team_authenticates_doctors"/>
            </Typography>
        </TwoSidedLayout>
    );
}
