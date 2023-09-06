import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { Box, Stack, Typography } from "@mui/material";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from '../../common/firebase';
import Iconify from '../../common/hook-form/Iconify';
import { dispatch, useSelector } from '../../common/redux/store';
import { ACCOUNT_MENU_OPTIONS } from '../constants';
import { setCurrentUser, setUserListOnline } from '../userInfo.slice';

export default function Header (){
    const { currentUser, users,open,userModal } = useSelector(state => state.userInfo)
    return (
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
                            onClick={async () => {
                                const q = query(
                                    collection(db, "users"),
                                    where("uid", "==", (currentUser.uid ?? ""))
                                );
                                if (q) {
                                    await updateDoc(doc(db, "users", currentUser.uid), {
                                        status: false
                                    });
                                }
                                dispatch(setCurrentUser({}))
                                dispatch(setUserListOnline([]))

                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </Dropdown>
    </Stack>
    )
}