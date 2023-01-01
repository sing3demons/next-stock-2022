import React from 'react'
import Layout from '@/components/Layout/Layout'
import { useSelector } from 'react-redux'
import { userSelector, setUsername, signUp } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/store/hook'

type Props = {}

const Index = (props: Props) => {
  // const userSelector = useSelector((store: any) => store.user)
  const { username } = useSelector(userSelector)
  const dispatch = useAppDispatch()

  return (
    <Layout>
      <div>name : {username}</div>
      <button onClick={() => dispatch(setUsername({ username: 'sing' }))}>Click</button>
      <button onClick={() => dispatch(signUp({ username: 'admin', password: '1234' }))}>sign up </button>
    </Layout>
  )
}

export default Index
