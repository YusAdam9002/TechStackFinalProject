import ChevronRight from '@mui/icons-material/ChevronRight';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({});

  useEffect(() => {
    window.location.reload();
    navigate('/', { replace: true })
  });

  return (
    <div style={{ padding: '15px', marginLeft: "25px" }}>
      404 NOT FOUND
    </div>
  );
};
export default ErrorPage;