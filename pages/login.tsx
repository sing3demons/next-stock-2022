import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, SxProps, Theme, ThemeProvider } from '@mui/material/styles'

import { useForm, SubmitHandler, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { useAppDispatch } from '@/store/hook'
import { signIn } from '@/store/slices/userSlice'
import { useRouter } from 'next/router'

const theme = createTheme()

type Inputs = {
  username: string
  password: string
}

type Props = {}

export default function login({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  }: UseFormReturn<Inputs, any> = useForm<Inputs>()

  const boxStyle = {
    my: 8,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const sxGrid: SxProps<Theme> = {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={sxGrid} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={boxStyle}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <FormLogin register={register} handleSubmit={handleSubmit} errors={errors} watch={watch} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

const FormLogin = ({ register, handleSubmit, errors, watch }: any) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    const response = await dispatch(signIn({ username, password }))
    if (response.meta.requestStatus === 'rejected') {
      alert('Login fail')
      return
    }

     router.push('/')
  }
  // console.log(watch('email'))
  // console.log(watch('password'))
  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {errors.username && <span style={{ color: 'red' }}>This field is required</span>}
      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Email Address"
        {...register('username', { required: true })}
        autoComplete="username"
        autoFocus
      />
      {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
      <TextField
        margin="normal"
        required
        fullWidth
        {...register('password', { required: true })}
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <LinkToSignUp />
      <Copyright sx={{ mt: 5 }} />
    </Box>
  )
}

const LinkToSignUp = () => (
  <Grid container>
    <Grid item xs>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link href="/register" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
)

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/sing3demons">
      sing3demons
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)
