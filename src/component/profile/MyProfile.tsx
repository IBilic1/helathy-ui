import * as React from 'react';
import {useState} from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import {Sheet} from "@mui/joy";
import {green} from "@mui/material/colors";
import Avatar from "boring-avatars";
import {useAuth} from "../../auth/AuthProvider";

const Game = () => {
    const [position, setPosition] = useState({top: 0, left: 0});

    const handleClick = () => {
        const container = document.getElementById('game-container');
        const containerWidth = container?.clientWidth;
        const containerHeight = container?.clientHeight;
        const iconSize = 50; // Icon size (width and height)

        if (containerHeight && containerWidth) {
            const newTop = Math.random() * (containerHeight - iconSize);
            const newLeft = Math.random() * (containerWidth - iconSize);

            setPosition({top: newTop, left: newLeft});
        }
    };


    return (
        <Sheet
            id="game-container"
            variant="outlined"
            sx={{
                width: '100%',
                height: '30vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <IconButton
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    top: position.top,
                    left: position.left,
                    width: 50,
                    height: 50,
                }}
            >
                <CoronavirusIcon sx={{color: green[800]}}/>
            </IconButton>
        </Sheet>
    );
};
export default function MyProfile() {
    const auth = useAuth();

    return (
        <Box sx={{width: '100%'}}>
            {auth?.user && <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: {xs: 2, md: 6},
                    py: {xs: 2, md: 3},
                }}
            >
                <Card>
                    <Box sx={{mb: 1}}>
                        <Typography level="title-md">Personal info</Typography>
                    </Box>
                    <Divider/>
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{display: {xs: 'none', md: 'flex'}, my: 1}}
                    >
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                maxHeight={200}
                                sx={{flex: 1, minWidth: 120, borderRadius: '100%'}}
                            >
                                <Avatar
                                    size={40}
                                    name="Maria Mitchell"
                                    variant="marble"
                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                />;
                            </AspectRatio>
                        </Stack>
                        <Stack spacing={2} sx={{flexGrow: 1}}>
                            <Stack spacing={1}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{display: {sm: 'flex-column', md: 'flex-row'}, gap: 2}}
                                >
                                    <Input size="sm" defaultValue={auth?.user?.name}/>
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input size="sm" defaultValue={auth?.user?.role}/>
                                </FormControl>
                                <FormControl sx={{flexGrow: 1}}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        size="sm"
                                        type="email"
                                        startDecorator={<EmailRoundedIcon/>}
                                        placeholder="email"
                                        defaultValue={auth?.user?.email}
                                        sx={{flexGrow: 1}}
                                    />
                                </FormControl>
                            </Stack>
                            <div>
                                <FormControl sx={{display: {sm: 'contents'}}}>
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        size="sm"
                                        defaultValue={auth?.user?.email}
                                        sx={{flexGrow: 1}}
                                        disabled={true}
                                    />
                                </FormControl>
                            </div>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{display: {xs: 'flex', md: 'none'}, my: 1}}
                    >
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={108}
                                    sx={{flex: 1, minWidth: 108, borderRadius: '100%'}}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </Stack>
                            <Stack spacing={1} sx={{flexGrow: 1}}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Input size="sm" placeholder="First name"/>
                                    <Input size="sm" placeholder="Last name"/>
                                </FormControl>
                            </Stack>
                        </Stack>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size="sm" defaultValue="UI Developer"/>
                        </FormControl>
                        <FormControl sx={{flexGrow: 1}}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon/>}
                                placeholder="email"
                                defaultValue="siriwatk@test.com"
                                sx={{flexGrow: 1}}
                            />
                        </FormControl>
                        <div>
                            <FormControl sx={{display: {sm: 'contents'}}}>
                                <FormLabel>Timezone</FormLabel>
                                <Select
                                    size="sm"
                                    startDecorator={<AccessTimeFilledRoundedIcon/>}
                                    defaultValue="1"
                                >
                                    <Option value="1">
                                        Indochina Time (Bangkok){' '}
                                        <Typography textColor="text.tertiary" sx={{ml: 0.5}}>
                                            — GMT+07:00
                                        </Typography>
                                    </Option>
                                    <Option value="2">
                                        Indochina Time (Ho Chi Minh City){' '}
                                        <Typography textColor="text.tertiary" sx={{ml: 0.5}}>
                                            — GMT+07:00
                                        </Typography>
                                    </Option>
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                    <CardOverflow sx={{borderTop: '1px solid', borderColor: 'divider'}}>
                        <CardActions sx={{alignSelf: 'flex-end', pt: 2}}>
                            <Button size="sm" variant="outlined" color="neutral">
                                Cancel
                            </Button>
                            <Button size="sm" variant="solid">
                                Save
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
                <Card>
                    <Box>
                        <Typography level="title-md">Game</Typography>
                    </Box>
                    <Divider/>
                    <Stack spacing={2} sx={{my: 1}}>
                        <Typography>
                            Are you quick enough to catch the virus before it escapes? In this thrilling game,
                            the virus icon moves to random spots on the screen, and your goal is to click on it before
                            it disappears!
                            Test your reflexes and agility—catch the virus or risk getting caught yourself!
                        </Typography>
                        <Game/>
                    </Stack>
                </Card>
            </Stack>}
        </Box>
    );
}

