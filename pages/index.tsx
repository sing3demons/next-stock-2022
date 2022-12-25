import React from 'react'
import Layout from '@/components/Layout/Layout'
import { useSelector } from 'react-redux'

type Props = {}

const Index = (props: Props) => {
  const userSelector = useSelector((store: any) => store.user)
  return (
    <Layout>
      <div>name : {userSelector.username}</div>
    </Layout>
  )
}

export default Index
