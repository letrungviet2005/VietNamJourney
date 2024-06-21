import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {getCookie, useCheckCookie}

const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

const useCheckCookie = (cookieName, redirectPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = getCookie(cookieName);
    if (!cookieValue) {
      navigate(redirectPath);
    }
  }, [cookieName, redirectPath, navigate]);

  return getCookie(cookieName);
};

export { getCookie, useCheckCookie };