import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHardHat } from '@fortawesome/free-solid-svg-icons';
import LOGIN from './pages/Login/';
import styled from 'styled-components';
import './account-overview.css';

export const AccountOverview = ({data}) => {
  console.log(data);

  return (
    <div className='container p-5'>
    <div className="AccountOverview d-inline-flex">
      <br/>
      <FontAwesomeIcon icon={faHardHat} className="d-inline-flex" size='lg' pull="right" />
      <LOGIN />
    </div>
    </div>
  )
  
}

export default AccountOverview;