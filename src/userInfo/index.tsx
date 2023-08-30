import { Avatar, Badge, Button, badgeClasses } from '@mui/joy';
import { Box, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../common/firebase";
import { dispatch, useSelector } from "../redux/store";
import Header from "./components/Header";
import ModalChatBox from "./components/ModalChatBox";
import { setOpen, setReload, setUserListOnline, setUserModal } from "./userInfo.slice";

export function UserInfo() {
    const { currentUser, reload, users, open, userModal } = useSelector(state => state.userInfo)
    useEffect(() => {
        const logUserOnline = async () => {
            const q = query(
                collection(db, "users"),
                where("uid", "!=", (currentUser.uid ?? "")), where("status", "==", true)
            );
            const querySnapshot = await getDocs(q);
            let test: any[] = []
            querySnapshot.forEach((doc) => {
                test = [...test, doc.data()]
                dispatch(setUserListOnline(test));

            });
        }
        const intervalId =  setInterval( logUserOnline, 1000);
       
return()=>{
    clearInterval(intervalId)
}
    }, [currentUser?.uid, reload]);
    console.log(reload)
    const handleModal = async (user: any) => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        const chatDocRef = doc(db, 'chats', combinedId);
        const docSnap = await getDoc(chatDocRef);
        if (docSnap.exists()) {
            await updateDoc(doc(db, "users", user.uid), {
                notiNewMessage: false,
            });
        } else {
            await setDoc(chatDocRef, { messages: [] });
        }
        dispatch(setOpen(true));
        dispatch(setUserModal(user))
        dispatch(setReload(false))
    }

    const handleClose = () => dispatch(setOpen(false));
    return (
        <Stack spacing={2}>
            <ModalChatBox userTalking={userModal} open={open} handleClose={handleClose} />
            <Stack display={"flex"} alignItems={"end"} position={"sticky"} bgcolor={"green"}>
                <Header />
            </Stack>
            <Stack>
                <Typography fontWeight={700} p={2} variant="h4">Danh sách user đang online </Typography>
                <Stack px={2} display={"flex"} direction={"row"} >{
                    users?.length ? (users.map(user => (<Box onClick={() => handleModal(user)} sx={{ display: 'flex', width: "10%", gap: 2, alignItems: 'center', flexDirection: "column" }}>
                     <Box width={"10px"} height={"10px"} bgcolor={user?.notiNewMessage ? "red" :"transparent"}
                        borderRadius={4}
                        zIndex={9999999} sx={{
                            position: "relative",
                            left:" 16%",
                            top: "26%"
                        }}
                          ></Box>
                        
                            <Avatar src="public/avatar.jpg" />

                        {user?.name}
                        
                    </Box>))) : (<Stack display={"flex"} spacing={2} alignItems={"center"} direction={"row"}><Button loading variant="plain">

                    </Button><Typography> Waiting for online user </Typography></Stack>)
                }


                </Stack>
            </Stack>
        </Stack>
    )
}