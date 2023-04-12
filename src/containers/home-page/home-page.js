import { useUserContext } from 'contexts/userContext';
import React, { useState } from 'react';
import './home-page.scss';

const STYLE_BASE = "HOME_PAGE";

const HomePage = () => {
  const {
    userInfo: { firstName, lastName },
  } = useUserContext();

  return (
    <div className={`${STYLE_BASE}-container`}>
      <div>{`${firstName} ${lastName}`}</div>
    </div>
  )
}

export default HomePage;
