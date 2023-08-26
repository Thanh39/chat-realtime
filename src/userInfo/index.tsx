import { Box, Stack, Typography } from "@mui/material";
import { Dropdown, MenuButton, IconButton, MenuItem, Menu, Avatar, Badge, badgeClasses, Button } from '@mui/joy';
import { ACCOUNT_MENU_OPTIONS } from "./constants";
import { Link } from "react-router-dom";
import Iconify from "../hook-form/Iconify";
import { io } from 'socket.io-client';
import { useEffect } from "react";
export function UserInfo() {
    const user = JSON.parse(localStorage.getItem('user') || "");
   
    const dataUserOnline: any[] = [];
  
        var socket = io('http://localhost:3000');
        console.log(socket)
        socket.on('connect', function () {
            alert('connect');
        });

        socket.on('error', function (data) {
            console.log(data || 'error');
        });

        socket.on('connect_failed', function (data) {
            console.log(data || 'connect_failed');
        });
     
  
    
    return (
        <Stack spacing={2}>
            <Stack display={"flex"} alignItems={"end"} position={"sticky"} bgcolor={"green"}>
                <Stack width={"10%"} m={2} >
                    <Dropdown>
                        <MenuButton
                            sx={{ background: "white" }}
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                        >
                            <Iconify icon={'ion:person-sharp'} />
                        </MenuButton>
                        <Menu>
                            <MenuItem disabled>
                                <Box sx={{ my: 1.5, px: 1 }}>
                                    <Typography variant="subtitle2" noWrap>
                                        {user?.name}
                                    </Typography>

                                </Box>
                            </MenuItem>
                            <Stack sx={{ p: 1 }}>
                                {ACCOUNT_MENU_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        to={option.linkTo}
                                        component={Link}
                                    // onClick={}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Stack>
                        </Menu>
                    </Dropdown>
                </Stack>

            </Stack>
            <Stack>
                <Typography fontWeight={700} p={2} variant="h4">Danh sách user đang online </Typography>
                <Stack px={2} >{
                    dataUserOnline?.length ? (<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Badge
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeInset="14%"
                            color="success"
                            sx={{
                                [`& .${badgeClasses.badge}`]: {
                                    '&::after': {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        animation: 'ripple 1.2s infinite ease-in-out',
                                        border: '2px solid',
                                        borderColor: 'success.500',
                                        content: '""',
                                    },
                                },
                                '@keyframes ripple': {
                                    '0%': {
                                        transform: 'scale(1)',
                                        opacity: 1,
                                    },
                                    '100%': {
                                        transform: 'scale(2)',
                                        opacity: 0,
                                    },
                                },
                            }}
                        >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Badge>
                    </Box>) : (<Stack display={"flex"} spacing={2} alignItems={"center"} direction={"row"}><Button loading variant="plain">

                    </Button><Typography> Waiting for online user </Typography></Stack>)
                }


                </Stack>
            </Stack>
        </Stack>
    )
}