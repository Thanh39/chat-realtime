import { IconButton, InputAdornment, Stack } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '../hook-form/RHFTextField';
import Iconify from '../hook-form/Iconify';
import { dispatch, useSelector } from '../redux/store';
import { setShowPassword } from './login.slice';

export default function Login() {
    const methods = useForm<any>({
        // resolver: yupResolver(LoginSchema),
        // defaultValues,
    });
const {showPassword} =useSelector(state => state.login)
    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    const submit = () => {

    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <Stack>
                    <RHFTextField
                        name="name" label="Ten dang nhap"
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
                </Stack>
            </form>
        </FormProvider>
    );
}