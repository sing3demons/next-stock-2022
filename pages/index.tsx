import React from 'react'
import Layout from '@/components/Layout/Layout'
import { useSelector } from 'react-redux'
import { userSelector, setUsername } from '@/store/slices/userSlice'
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
    </Layout>
  )
}

export default Index
