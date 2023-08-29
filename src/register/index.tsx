import { IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '../hook-form/RHFTextField';
import Iconify from '../hook-form/Iconify';
import { dispatch, useSelector } from '../redux/store';
import { setShowPassword } from './register.slice';
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../common/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from '@firebase/firestore';
import { useSnackbar } from 'notistack';
import { setCurrentUser } from '../userInfo/userInfo.slice';
export default function Register() {
    const { enqueueSnackbar } = useSnackbar();
    const methods = useForm<any>({
        // resolver: yupResolver(LoginSchemyara),
        // defaultValues,
    });
    const { showPassword } = useSelector(state => state.register)
    const navigate = useNavigate();
    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    const submit = async (data: { [key in string]: string }) => {
        const { name, email, password } = data
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("hello")

            console.log(res)
            try {
                //Update profile
                await updateProfile(res.user, {
                    displayName: name,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    name,
                    email,
                    status:false
                });
                console.log({
                    uid: res.user.uid,
                    name,
                    email,
                })

                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});


            } catch (err) {
                console.log("hello")
                console.log(err);
            }
          
            enqueueSnackbar("Email is already", {
                variant: 'success'
            });
            navigate("/");
        } catch (error: any) {
            console.log(error?.code)
            if (error.code === "auth/email-already-in-use") {
                console.log("hello")
                enqueueSnackbar("Email is already", {
                    variant: 'error'

                });
            }

        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <Stack height={"700px"}>
                    <Stack display={"flex"} margin={"auto"} spacing={3} width={"50%"}>
                        <Typography width={"100%"} variant="h4" textAlign={"center"}>User Information</Typography>
                        <RHFTextField
                            name="email" label="Email"
                        />
                        <RHFTextField
                            name="name" label="User name"
                        />
                        <RHFTextField
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => dispatch(setShowPassword(!showPassword))} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Đăng ký
                        </LoadingButton>
                        <Typography>If you have account . Please <Link href="/" >Login</Link>  !</Typography>
                    </Stack>
                </Stack>
            </form>
        </FormProvider>
    );
}