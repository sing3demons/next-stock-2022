import { useAppDispatch } from '@/store/hook'
import { Box, Button, Card, CardContent, CardMedia, SxProps, Theme } from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { signUp } from '@/store/slices/userSlice'

type Props = {}

interface RegisterForm {
  username: string
  password: string
}

export default function register({}: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const sxBox: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }

  const initialValues: RegisterForm = { username: '', password: '' }

  const onSubmit = async ({ username, password }: RegisterForm) => {
    const response = await dispatch(signUp({ username, password }))
    if (response.meta.requestStatus === 'rejected') {
      alert('Register fail')
      return
    }

    router.push('/login')
  }

  return (
    <>
      <Box sx={sxBox}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 200 }} image="/static/img/next_register.jpg" title="Contemplative Reptile" />
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
              {props => showForm(props, router)}
            </Formik>
          </CardContent>
        </Card>
        {globalStyle}
      </Box>
    </>
  )
}

const globalStyle: JSX.Element = (
  <style jsx global>
    {`
      body {
        min-height: 100vh;
        position: relative;
        margin: 0;
        background-size: cover;
        background-image: url('/static/img/bg4.jpg');
        text-align: center;
      }
    `}
  </style>
)

const showForm = (
  { values, setFieldValue, isValid, dirty, handleSubmit }: FormikProps<RegisterForm>,
  router: NextRouter
) => (
  <Form onSubmit={handleSubmit}>
    <Field
      component={TextField}
      name="username"
      id="username"
      margin="normal"
      required
      fullWidth
      label="Username"
      autoComplete="email"
      autoFocus
    />
    <Field
      component={TextField}
      name="password"
      margin="normal"
      required
      fullWidth
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
    <Button type="submit" fullWidth variant="contained" color="primary">
      Register
    </Button>
    <Button fullWidth size="small" color="primary" onClick={() => router.push('/login')}>
      Cancel
    </Button>
  </Form>
)
