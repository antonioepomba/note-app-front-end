import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHardHat } from '@fortawesome/free-solid-svg-icons';
import UsersList from '../User';
import NOTELIST from '../Note';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../account-overview.css';

export default function Login({ data }) {
  console.log(data);
  const [openForm, setOpenForm] = useState(0);
  const [email, setEmail] = useState('')
  const  [password, setPassword] = useState ('')
  const myStorage = localStorage;

  const handleNoteList = () => {
    setOpenForm(2)
  }

  const handleUsers = () => {
    setOpenForm(1)
  }
  const start = () => {
    switch (openForm) {
      case 0:
        return loginForm();
      case 1:
        return goToUsers();
      case 2:
        return goToList();
      default:
        break;
    }
  }
  const loginForm = () => {
    return (
      <div className='container p-5'>
         <FontAwesomeIcon icon={faHardHat} className="d-inline-flex" size='lg' pull="center" />
         <h3 className="text-right">Login</h3>
        <div className="AccountOverview d-inline-flex">
          <br />
          <div className="container  p-5">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
              <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
               onChange={(e) => setEmail(e.target.value)}
               value ={email} />
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
              <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
               onChange={(e) => setPassword(e.target.value)}
               value ={password} />
            </div>
            <div className='row'>
              <div className='col-sm'><button onClick={handleNoteList}  class="btn btn-primary">Login</button>

              </div>
              <div className='col'>
                <button onClick={handleUsers} class="btn btn-primary"> Register Here</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const goToList = () => {
    return (
      <NOTELIST />
    )

  }
  const goToUsers = () => {
    return (
      <UsersList />
    )

  }


  const submitLogin =() => {

  console.log('password',password)
  console.log('email',email)

}


  return start();
}
  