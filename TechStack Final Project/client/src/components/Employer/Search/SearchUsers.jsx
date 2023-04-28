import { ChevronRight, ExpandMore, Search } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputBase, Link, Paper, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedUsers, getAssignedUsersByEmployer, searchUsers } from '../../../service/Service';
import Profile from '../../Student/Profile/Profile';

const SearchUsers = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        users: [],
        filteredUsers: [],
        filter: '',

        useSelectedUsers: false,
        assignedUsers: []
    });

    const getAssigndUsers = async () => {
        const res = await getAssignedUsersByEmployer(localStorage.getItem('USERID'))
        setState((st) => ({
            ...st,
            assignedUsers: res.data,
        }));
    }

    const getUsersAndUpdateState = async () => {
        const res = await searchUsers(state.filter)
        setState((st) => ({
            ...st,
            users: res.data,
        }));
    }

    useEffect(() => {
        getUsersAndUpdateState()
        getAssigndUsers()
    }, [state.filter, state.useSelectedUsers]);

    const isUserAssigned = (id) => {
        let shouldReturnTrue = false;
        state.assignedUsers.map((usr) => {
            if (usr.id == id) {
                shouldReturnTrue = true;
            }
        })
        return shouldReturnTrue;
    }

    useEffect(() => {
        if (state.useSelectedUsers) {

            let newUserList = [];

            state.users.map((us) => {
                if (isUserAssigned(us.id)) {
                    newUserList.push(us)
                }
            })

            setState((st) => ({
                ...st,
                filteredUsers: newUserList
            }))
        }
    }, [state.useSelectedUsers]);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({
            ...st,
            [name]: value,
        }));
    }

    const handleEdit = (va, id) => {
        setState((st) => ({
            ...st,
            showEdit: va,
            focusedUser: id
        }));
    }

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;

        setState((st) => ({
            ...st,
            [name]: checked
        }))
    }

    return (
        <div style={{ padding: '15px', marginLeft: "25px" }}>

            <Dialog
                onClose={() => handleEdit(false)}
                open={state.showEdit}
                fullWidth
                maxWidth="xl"
            >
                <DialogTitle style={{ backgroundColor: '#313131', color: 'white', justifyContent: 'space-between' }}>
                    <div>
                        View Profile
                    </div>
                </DialogTitle>
                <DialogContent style={{ backgroundColor: '#313131', color: 'white' }}>
                    <Profile id={state.focusedUser} />
                </DialogContent>
            </Dialog>

            <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: 'cyan' }}> <ChevronRight style={{ marginTop: '5px' }} /> </span>}>
                <Link color="secondary" href="/">
                    PLCMNT
                </Link>
                <Link color="secondary" href="/">
                    HOME
                </Link>
                <Link color="secondary" href="/">
                    SEARCH
                </Link>
            </Breadcrumbs>

            <div style={{ padding: '50px' }}>
                <div style={{ width: '100%' }}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography style={{ marginTop: '7px' }}>
                            Selected Users
                        </Typography>
                        <Switch label="useSelectedUsers" name="useSelectedUsers" onChange={handleSwitchChange} checked={state.useSelectedUsers} />
                    </div>

                    <div style={{ marginBottom: '5px', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                        {state.filter == '' ? `Showing all (${state.users.length}) users` : `Showing filtered (${state.users.length}) users`}
                    </div>

                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                        style={{ justifyContent: 'space-between', display: 'flex' }}
                    >

                        <InputBase
                            name="filter"
                            value={state.filter}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Users by Skill, CV, or Placement"
                            inputProps={{ 'aria-label': 'search users' }}
                            onChange={inputChange}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <Search />
                        </IconButton>

                    </Paper>
                </div>

                <div style={{ marginTop: '50px' }}>
                    <Grid container spacing={3}>

                        {state.useSelectedUsers ?
                            <>
                                {state.filteredUsers.map((usr) => {
                                    return (
                                        <Grid item xl={4} md={6} xs={12}>
                                            <Accordion defaultExpanded={true} style={{ backgroundColor: '#313131', color: 'white' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore style={{ color: 'white', }} />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography style={{ fontWeight: 'bold' }}>{usr.displayname}</Typography>
                                                </AccordionSummary>
                                                <hr style={{ backgroundColor: '#282828' }} />
                                                <AccordionDetails>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                                        <div style={{ width: '50%', }}>
                                                            <span style={{ color: 'red' }}>[SKILLS]</span>
                                                            <ul>
                                                                {usr?.skills?.split(",").map((skill) => {
                                                                    return (
                                                                        <li>
                                                                            {skill}
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div style={{ width: '50%', }}>
                                                            <span style={{ color: 'red' }}>[EDUCATION]</span>
                                                            <ul>
                                                                {usr?.education?.split(",").map((ed) => {
                                                                    return (
                                                                        <li>
                                                                            {ed}
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => handleEdit(true, usr.id)} style={{ width: '100%', color: 'green' }} variant="contained">
                                                        View More Profile Info
                                                    </Button>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    )
                                })}

                            </>
                            :
                            <>
                                {state.users.map((usr) => {
                                    return (
                                        <Grid item xl={4} md={6} xs={12}>
                                            <Accordion defaultExpanded={true} style={{ backgroundColor: '#313131', color: 'white' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore style={{ color: 'white', }} />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography style={{ fontWeight: 'bold' }}>{usr.displayname}</Typography>
                                                </AccordionSummary>
                                                <hr style={{ backgroundColor: '#282828' }} />
                                                <AccordionDetails>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                                        <div style={{ width: '50%', }}>
                                                            <span style={{ color: 'red' }}>[SKILLS]</span>
                                                            <ul>
                                                                {usr?.skills?.split(",").map((skill) => {
                                                                    return (
                                                                        <li>
                                                                            {skill}
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div style={{ width: '50%', }}>
                                                            <span style={{ color: 'red' }}>[EDUCATION]</span>
                                                            <ul>
                                                                {usr?.education?.split(",").map((ed) => {
                                                                    return (
                                                                        <li>
                                                                            {ed}
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => handleEdit(true, usr.id)} style={{ width: '100%', color: 'green' }} variant="contained">
                                                        View More Profile Info
                                                    </Button>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    )
                                })}

                            </>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    );
};
export default SearchUsers;