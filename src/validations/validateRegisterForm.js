import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup
        .string()
        .email('Email must be in the format: example@domain.com')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, 'Email must be in the format: example@domain.com')
        .required('Email is required')
        .min(3, 'Must be at least 3 characters long')
        .max(50, 'Too long'),
    password: yup.string().required('Password is required').min(8, 'Must be at least 8 characters long').max(12, 'Too long'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
