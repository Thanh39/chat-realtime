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
import { useSelector } from "../../redux/store";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
    const [messages, setMessages] = useState([]);
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


        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [currentUser.uid + ".lastMessage"]: {
                text,
            },
            [currentUser.uid + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", userTalking.uid), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });
    };
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [chatId]);
      console.log("message đâu",messages)
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
            {messages.map((message:any) => (
                <Stack m={3} display={"flex"} direction={"row"} spacing={2}>
                    <Stack display={"flex"} direction={"column"} spacing={.5}>
                        {/* <Avatar src="public/avatar.jpg" />  */}
                        <Typography fontSize={"12px"} sx={{ opacity: .6 }}>{   message.senderId === currentUser.uid
              ? currentUser.name
              : userTalking?.name}</Typography>
                        <Typography fontSize={"12px"} sx={{ opacity: .6 }}>3:01 pm</Typography>
                    </Stack>
                    <Box bgcolor="white" width={"50%"} borderRadius={3} textAlign="start">
                        <Typography p={1}>{message.text}</Typography>
                    </Box>
                </Stack>
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