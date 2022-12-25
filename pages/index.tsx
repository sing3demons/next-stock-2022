import React from 'react'
import Layout from '@/components/Layout/Layout'
import { useSelector } from 'react-redux'
import { userSelector } from '../store/slices/userSlice';

type Props = {}

const Index = (props: Props) => {
  // const userSelector = useSelector((store: any) => store.user)
  const { username } = useSelector(userSelector)

  return (
    <Layout>
      <div>name : {username}</div>
    </Layout>
  )
}

export default Index
