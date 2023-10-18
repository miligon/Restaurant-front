import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { doLogin } from '../../store/auth/thunks'

export const LoginPage = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e: any) => {
    e.preventDefault()
    if (username != '' && password != '') {
      dispatch(doLogin(username, password) as any)
    }
  }

  return (
    <div className='p-2'>
      <h1>Restaurant App</h1>
      <hr />
      <h5>Login</h5>
      <form onSubmit={onLogin}>
        <input
          type='text'
          id='inputUser'
          className='form-control'
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          required
          autoFocus
        />
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          required
        />
        <br />
        <button className='btn btn-primary' type='submit' onClick={onLogin}>
          Enter
        </button>
      </form>
    </div>
  )
}
