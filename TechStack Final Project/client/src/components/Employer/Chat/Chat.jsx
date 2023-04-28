import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material'
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import { getAssignedUsers } from '../../../service/Service';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Grid } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Chat = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    assignedUsers: []
  });

  const getAssignedUsersAndUpdateState = async () => {
    const res = await getAssignedUsers(localStorage.getItem("USERID"));

    if (res.success) {
      setState((st) => ({
        ...st,
        assignedUsers: res.data
      }));
    }
  }

  useEffect(() => {
    getAssignedUsersAndUpdateState();
  }, [localStorage.getItem("ROLE")]);

  const userType = useMemo(() => {
    return localStorage.getItem("ROLE")
  }, [localStorage.getItem("ROLE")])

  return (
    <div style={{ padding: '15px', marginLeft: "25px", }}>
      <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        [Connect with {userType == 2 ? 'Employers' : 'Employees'}]
      </Typography>

      <Grid container spacing={1}>
        {state?.assignedUsers?.map((usr) => {
          return (
            <Grid item xl={4} md={6} xs={12}>
              <Paper elevation={5} style={{ backgroundColor: '#313131', padding: '5px' }}>
                <Typography variant="h4" style={{ color: 'white', textAlign: 'center' }}>
                  {usr.userassignedtodisplyname ? usr.userassignedtodisplyname : 'Example User'}
                </Typography>
                <Button onClick={() => console.log()} style={{ width: '100%', color: 'green' }} variant="contained">
                  Connect
                </Button>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div >
  );
};
export default Chat;