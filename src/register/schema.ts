import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    password: yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.'),
    email: yup.string().email().required('Email is required'),
});