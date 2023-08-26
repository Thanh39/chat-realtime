import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '../hook-form/RHFTextField';
import Iconify from '../hook-form/Iconify';
import { dispatch, useSelector } from '../redux/store';
import { setShowPassword } from './login.slice';
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const methods = useForm<any>({
    // resolver: yupResolver(LoginSchemyara),
    // defaultValues,
  });
  const { showPassword } = useSelector(state => state.login)
  const navigate =useNavigate();
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const submit = (data : {[key in string]:string}) => {
    console.log(data)
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/info')
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack height={"700px"}>
        <Stack display={"flex"} margin={"auto"} spacing={3} width={"50%"}>
          <Typography width={"100%"}   variant="h4" textAlign={"center"}>User Information</Typography>
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
        Đăng nhập
      </LoadingButton>
        </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}