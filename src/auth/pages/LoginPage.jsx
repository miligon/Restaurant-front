import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from '../AuthContext';
import { getRestaurantList } from '../../helpers/ApiConn';

export const LoginPage = () => {

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const onLogin = async (e) => {
      e.preventDefault();
      if (username != "" &&
        password != "") {
  
        const response = await login(username, password); 
        console.log(response)
        // If the user is logged in successfully, redirect to the tickets page of the first restaurant
        getRestaurantList()
        .then((res)=>{
            const url = `/${res.data[0].slug}/tickets`
            console.log(url)
            navigate(url, {
                replace: true
              });
        })
      }
    }

  return (
      <div className="p-2">
          <h1>Restaurant App</h1>
          <hr />
          <h5>Login</h5>
          <form onSubmit={onLogin}>
              <input type="text" id="inputUser" className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                      setUsername(e.target.value);
                  }}
                  required autoFocus />
              <input type="password" id="inputPassword" className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                      setPassword(e.target.value);
                  }}
                  required />
              <br />
              <button className="btn btn-primary"
                  type="submit"
                  onClick={onLogin}>
                  Entrar
              </button>
          </form>
      </div>
  )
}