import { AccountBox, Notifications, Search } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedUsers } from '../service/Service';

const HeaderBar = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    assignedUsers: []
  });

  const getAssignedUsersAndUpdateState = async (id) => {
    const res = await getAssignedUsers(id);

    if (res.success) {
      setState((st) => ({
        ...st,
        assignedUsers: res.data
      }));
    }
  }

  useEffect(() => {
    getAssignedUsersAndUpdateState(localStorage.getItem("USERID"))
  }, [localStorage.getItem("USERID")]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  }

  const handleNavigate = (page) => {
    navigate(`/${page}`, { replace: true });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#383838' }}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6">
              PLCMNT
            </Typography>
          </div>
          <div style={{ display: 'flex' }}>
            <Button color="secondary" size="large" variant="contained" onClick={() => handleNavigate("home")} style={{ marginRight: '10px' }}>
              <AccountBox style={{ color: 'white', marginRight: '5px' }} />
              <span style={{ fontWeight: 'bold' }}>Home</span>
            </Button>

            <Button color="secondary" size="large" variant="contained" onClick={() => handleNavigate("jobs")} style={{ marginRight: '10px' }}>
              <AccountBox style={{ color: 'white', marginRight: '5px' }} />
              <span style={{ fontWeight: 'bold' }}>Jobs/Applications</span>
            </Button>

            {localStorage.getItem("ROLE") == 2 ?
              <>
                <Button color="secondary" size="large" variant="contained" onClick={() => handleNavigate("profile")} style={{ marginRight: '10px' }}>
                  <AccountBox style={{ color: 'white', marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}>My Profile</span>
                </Button>
              </> : null}

            {localStorage.getItem("ROLE") == 1 ?
              <>
                <Button color="secondary" size="large" variant="contained" onClick={() => handleNavigate("search")} style={{ marginRight: '10px' }}>
                  <Search style={{ color: 'white', marginRight: '5px' }} />
                  <span style={{ fontWeight: 'bold' }}>User Lookup</span>
                </Button>
              </> : null}

            <Button color="secondary" onClick={handleLogout} style={{ marginRight: '10px' }}>
              Logout
            </Button>

            {/* {localStorage.getItem("ROLE") == 2 ?
              <>
                <div style={{ borderLeft: '1px solid white', height: '50px', marginRight: '10px' }} />
                <IconButton onClick={() => navigate("/chat", { replace: true })}>
                  <Badge badgeContent={state.assignedUsers.length} color="secondary">
                    <Notifications style={{ color: 'white' }} />
                  </Badge>
                </IconButton>
              </> : null} */}

          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderBar;