import { Stack, Typography, Avatar, TextField, Button } from "@mui/material";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    arrayUnion,
    doc,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../common/firebase";
import { dispatch, useSelector } from "../../redux/store";
import { setChats, setReload } from "../userInfo.slice";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface Props {
    open: boolean,
    handleClose: VoidFunction,
    userTalking: any
}
export default function ModalChatBox(props: Props) {
    const { currentUser, chats } = useSelector(state => state.userInfo)
    const [text, setText] = useState("");
    const { open, handleClose, userTalking } = props
    const chatId = currentUser.uid > userTalking?.uid
        ? currentUser.uid + userTalking?.uid
        : userTalking?.uid + currentUser.uid
    const handleSend = async () => {

        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });

        await updateDoc(doc(db, "users", currentUser.uid), {
            notiNewMessage: true,
        });
        await updateDoc(doc(db, "users", userTalking.uid), {
            notiNewMessage: false,
        });
        setText("")
        dispatch(setReload(true))
    };
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
            doc.exists() && dispatch(setChats(doc.data().messages));
        });

        return () => {
            unSub();
        };
    }, [chatId]);
    const formatime = (date: any) => {
        const { nanoseconds, seconds } = date
        const milliseconds = Math.floor(nanoseconds / 1000000);
        const timestamp = new Date(seconds * 1000 + milliseconds);
        timestamp.setUTCMinutes(timestamp.getUTCMinutes() + 7 * 60);
        const day = timestamp.getUTCDate();
        const month = timestamp.getUTCMonth() + 1; 
        const year = timestamp.getUTCFullYear();
        const hours = timestamp.getUTCHours();
        const minutes = timestamp.getUTCMinutes();
        const period = hours >= 12 ? 'pm' : 'am';
        return `${hours % 12}:${minutes}${period} ${day}/${month}/${year}`;

    }
    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Messager
            </Typography>
            <Typography color="#17bed4" id="modal-modal-title" variant="h6" component="h2">
                {userTalking?.name}
            </Typography>
            <Stack bgcolor="#e3dddc">
                {chats.map((chat: any) => (
                    chat.senderId === currentUser.uid ? (
                        <Stack m={3} display={"flex"} direction={"row"} justifyContent={"end"} spacing={2}>
                            <Box bgcolor="white" width={"50%"} borderRadius={3} textAlign="start">
                                <Typography p={1}>{chat.text}</Typography>
                            </Box>
                            <Stack display={"flex"} direction={"column"} spacing={.5}>

                                <Typography fontSize={"12px"} sx={{ opacity: .6 }}>{chat.senderId === currentUser.uid
                                    ? currentUser.name
                                    : userTalking?.name}</Typography>
                                <Typography fontSize={"12px"} sx={{ opacity: .6 }}>{formatime(chat?.date)}</Typography>
                            </Stack>

                        </Stack>
                    ) : (
                        <Stack m={3} display={"flex"} direction={"row"} spacing={2}>
                            <Stack display={"flex"} direction={"column"} spacing={.5}>

                                <Typography fontSize={"12px"} sx={{ opacity: .6 }}>{chat.senderId === currentUser.uid
                                    ? currentUser.name
                                    : userTalking?.name}</Typography>
                                <Typography fontSize={"12px"} sx={{ opacity: .6 }}>{formatime(chat?.date)}</Typography>
                            </Stack>
                            <Box bgcolor="white" width={"50%"} borderRadius={3} textAlign="start">
                                <Typography p={1}>{chat.text}</Typography>
                            </Box>
                        </Stack>
                    )
                ))}
            </Stack>
            <Stack display={"flex"} mt={2} direction={"row"} spacing={2} justifyContent={"space-between"}>
                <TextField sx={{ width: "100%" }} onChange={(e) => setText(e.target.value)}
                    value={text} />


                <Button onClick={handleSend} sx={{ fontWeight: 700 }}>Send</Button>
            </Stack>
        </Box>
    </Modal>)
}