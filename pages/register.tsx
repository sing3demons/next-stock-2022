import { Formik } from 'formik'
import React from 'react'

type Props = {}

interface RegisterForm {
  username: string
  password: string
}

export default function register({}: Props) {
  return (
    <div>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={v => console.log(v)}>
        {({ handleChange, values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input type="text" id="username" onChange={handleChange} value={values.username} placeholder="username" />
            <br />
            <input type="text" id="password" onChange={handleChange} value={values.username} placeholder="password" />
            <br />
            <button>register</button>
          </form>
        )}
      </Formik>
    </div>
  )
}
