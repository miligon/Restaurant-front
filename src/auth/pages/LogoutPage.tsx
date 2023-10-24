import React from 'react'
//import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../store/hooks'
import { doLogout } from '../../store/auth/thunks'
import { Navigate } from 'react-router-dom'

// views
export const LogoutPage = () => {
  const dispatch = useAppDispatch()
  dispatch(doLogout() as any)

  return (
    <>
      <Navigate to='/login' />
    </>
  )
}
