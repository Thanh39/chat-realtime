import { IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '../common/hook-form/RHFTextField';
import Iconify from '../common/hook-form/Iconify';
import { dispatch, useSelector } from '../common/redux/store';
import { setShowPassword } from './login.slice';
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../common/firebase';
import { setCurrentUser } from '../userInfo/userInfo.slice';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { schema } from './schema';
import { DEFAULT_VALUE } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Login() {
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUE,
  });
  const { showPassword } = useSelector(state => state.login)
  const navigate = useNavigate();
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const submit = async (data: { [key in string]: string }) => {
    const { email, password } = data
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser({
        uid: res.user.uid,
        name: res.user.displayName,
        email,
      }))
      const q = query(
        collection(db, "users"),
        where("uid", "==", (res.user.uid ?? ""))
    );
    if(q){
      await updateDoc(doc(db, "users", res.user.uid), {
     status:true
      });
    }
      navigate('/info')
    } catch (err) {
      console.log(err)
      // setErr(true);
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
            <Typography>If you dont have account . Please <Link href="/register" >Register</Link>  !</Typography>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Đăng nhập
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}