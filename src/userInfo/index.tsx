import { Box, Stack, Typography } from "@mui/material";
import { Dropdown, MenuButton, IconButton, MenuItem, Menu, Avatar, Badge, badgeClasses, Button } from '@mui/joy';
import { ACCOUNT_MENU_OPTIONS } from "./constants";
import { Link } from "react-router-dom";
import Iconify from "../hook-form/Iconify";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../redux/store";
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../common/firebase";
import { setChats } from "./userInfo.slice";
import ModalChatBox from "./components/ModalChatBox";

export function UserInfo() {
    const { currentUser, chats } = useSelector(state => state.userInfo)
    const [users, setUserListOnline] = useState<any[]>();
    const [open, setOpen] = useState(false);
    const [userModal, setUserModal] = useState<any>();
    useEffect(() => {
        // const getChats = () => {
        //   const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        //     console.log(doc.data())
        //     dispatch(setChats(doc.data())) ;
        //   });

        //   return () => {
        //     unsub();
        //   };
        // };

        // currentUser.uid && getChats();
        console.log(currentUser)
        const logUserOnline = async () => {
            const q = query(
                collection(db, "users"),
                where("uid", "!=", (currentUser.uid ?? "")), where("status", "==", true)
            );
            
            try {
                console.log("sai f")
                const querySnapshot = await getDocs(q);
                console.log( querySnapshot)
                querySnapshot.forEach((doc) => {
                   
                    setUserListOnline([doc.data() as any]);
                });
            } catch (err) {
                console.log(err)
                // setErr(true);
            }
        }
        logUserOnline()

    }, [currentUser.uid]);
    console.log("xuat user ddang online", users)
    const handleClose = () => setOpen(false);
    return (
        <Stack spacing={2}>
            <ModalChatBox userTalking={userModal} open={open} handleClose={handleClose} />
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
                                        {currentUser?.name}
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
                    users?.length ? (users.map(user =>(<Box onClick={async() => {
                        const combinedId =
                        currentUser.uid > user.uid
                          ? currentUser.uid + user.uid
                          : user.uid + currentUser.uid;
                          // neu co id chat roi
                          //thi lay no ra
                          //khong có thì tạo nó
                        await setDoc(doc(db, "chats", combinedId), { messages: [] });
                        setOpen(true);setUserModal(user)}} sx={{ display: 'flex',width:"10%", gap: 2, alignItems: 'center',flexDirection:"column" }}>
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
                        <Avatar src="public/avatar.jpg" />  

                    </Badge>
                    {user?.name}
                </Box>))) : (<Stack display={"flex"} spacing={2} alignItems={"center"} direction={"row"}><Button loading variant="plain">

                    </Button><Typography> Waiting for online user </Typography></Stack>)
                }


                </Stack>
            </Stack>
        </Stack>
    )
}