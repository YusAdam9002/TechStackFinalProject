import { ChevronRight } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import { Alert, Avatar, Breadcrumbs, Button, Dialog, DialogContent, DialogTitle, Grid, Link, Paper, Snackbar, Step, StepLabel, Stepper, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedUsers, getUserByID, getUserExtensionDataByID, setAssigned } from '../../../service/Service';
import './Profile.css';
import ProfileEdit from './ProfileEdit';

const Profile = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        showEdit: false,

        id: '',
        username: '',
        email: '',
        displayname: '',
        profilepictureurl: '',
        role: null,
        datecreated: '',
        datelastlogin: '',
        cv: '',
        dob: '',
        phonenumber: '',
        skills: '',
        education: '',

        showToast: false,
        toastMsg: '',
        toastSev: '',

        assignedUsers: [],
    });

    const isUserAssigned = useMemo(() => {
        let assigned = false;
        state.assignedUsers.map((usr) => {
            if (usr.idassignedto == localStorage.getItem("USERID") && usr.id == props.id) {
                assigned = true;
            }
        })
        return assigned;
    }, [props.id, state.assignedUsers]);

    const assignUser = async () => {
        const data = {
            user: props.id,
            userassignedto: localStorage.getItem("USERID"),
            mode: isUserAssigned ? 'delete' : 'add'
        }

        const res = await setAssigned(data)

        getAssignedUsersAndUpdateState()

        setState((st) => ({
            ...st,
            showToast: true,
            toastMsg: res.msg,
            toastSev: res.success ? 'success' : 'error'
        }));
    }

    const getAssignedUsersAndUpdateState = async () => {
        const res = await getAssignedUsers(props.id);

        if (res.success) {
            setState((st) => ({
                ...st,
                assignedUsers: res.data
            }));
        }
    }

    useEffect(() => {
        if (props.id) {
            getAssignedUsersAndUpdateState();
        }
    }, [props.id]);

    const getCoreUserInfo = async () => {
        const res = await getUserByID(props.id ? props.id : localStorage.getItem('USERID'))
        if (res.success) {
            setState((st) => ({
                ...st,
                id: res.data[0].id,
                username: res.data[0].username,
                email: res.data[0].email,
                displayname: res.data[0].displayname,
                profilepictureurl: res.data[0].profilepictureurl,
                role: res.data[0].role,
                datecreated: res.data[0].datecreated,
                datelastlogin: res.data[0].datelastlogin,
            }));
        }
    }
    const getExtensionUserInfo = async () => {
        const res = await getUserExtensionDataByID(props.id ? props.id : localStorage.getItem('USERID'))
        if (res.success) {
            setState((st) => ({
                ...st,
                cv: res.data[0]?.cv,
                dob: res.data[0]?.dob,
                phonenumber: res.data[0]?.phonenumber,
                skills: res.data[0]?.skills,
                education: res.data[0]?.education
            }));
        }
    }

    useEffect(() => {
        getCoreUserInfo();
    }, [state.showEdit]);

    useEffect(() => {
        getExtensionUserInfo();
    }, [state.id, state.showEdit]);

    const handleEdit = (va) => {
        setState((st) => ({
            ...st,
            showEdit: va,
        }));
    }

    const handleSnackBar = (show, msg, type) => {
        setState((st) => ({
            ...st,
            showToast: show,
            toastMsg: msg,
            toastSev: type
        }));
    }

    const CustomStepIcon = (props) => {
        const { active, completed } = props;
        const color = completed ? 'primary' : 'inherit';
        const icon = completed ? <SchoolIcon style={{ fontSize: 40 }} /> : <SchoolIcon style={{ fontSize: 40 }} {...props} />;

        return (
            <div>
                {icon}
                <style>{`.MuiStepIcon-root.MuiStepIcon-active { color: ${color}; }`}</style>
            </div>
        );
    };

    return (
        <div>
            <div>
                <Snackbar style={{ zIndex: 999 }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={state.showToast} autoHideDuration={3000} onClose={() => setState((st) => ({ ...st, showToast: false }))}>
                    <Alert onClose={() => setState((st) => ({ ...st, showToast: false }))} severity={state.toastSev} sx={{ width: '100%' }}>
                        {state.toastMsg}
                    </Alert>
                </Snackbar>
            </div>
            <div style={{ padding: '15px', marginLeft: "25px" }}>
                <Dialog onClose={() => handleEdit(false)} open={state.showEdit}>
                    <DialogTitle style={{ backgroundColor: '#313131', color: 'white', justifyContent: 'space-between' }}>
                        <div>
                            Edit Profile
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#313131', color: 'white' }}>
                        <ProfileEdit onClose={() => handleEdit(false)} snack={(show, msg, type) => handleSnackBar(show, msg, type)} data={state} />
                    </DialogContent>
                </Dialog>

                {props.id ? null :
                    <div>
                        <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: 'cyan' }}> <ChevronRight style={{ marginTop: '5px' }} /> </span>}>
                            <Link color="secondary" href="/">
                                PLCMNT
                            </Link>
                            <Link color="secondary" href="/">
                                HOME
                            </Link>
                            <Link color="secondary" href="/">
                                PROFILE
                            </Link>
                        </Breadcrumbs>
                    </div>
                }

                <Grid container spacing={3} style={{ marginTop: '10px' }}>
                    <Grid item xs={12} xl={5}>
                        <div>
                            <Paper elevation={5} style={{ backgroundColor: '#313131', width: '100%' }}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <Avatar
                                            alt={state.displayname}
                                            src={state.profilepictureurl}
                                            variant="square"
                                            style={{ width: '300px', height: '300px', border: '1px solid white' }}
                                        />
                                    </div>
                                    <div style={{ overflow: 'clip', width: '100%', border: '1px solid white' }}>
                                        <Paper elevation={3} style={{ textAlign: 'center', height: '35px', width: '100%', overflow: 'hidden', color: 'white', padding: '10px', backgroundColor: '#444444', display: 'block' }}>
                                            <Typography variant="h4">
                                                {state.displayname}
                                            </Typography>
                                        </Paper>
                                        <Typography variant="h5" style={{ marginTop: '15px', textAlign: 'center' }}>
                                            <span style={{ color: 'red', marginRight: '10px', marginLeft: '10px' }}>[DOB]</span>
                                            <br />
                                            <span style={{ color: 'white', marginRight: '10px', marginLeft: '10px' }}>{moment(state.dob).format('DD-MM-YYYY')}</span>
                                        </Typography>
                                        <Typography variant="h5" style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <span style={{ color: 'red', marginRight: '10px', marginLeft: '10px' }}>[EMAIL]</span>
                                            <br />
                                            <span style={{ color: 'white', marginRight: '10px', marginLeft: '10px' }}>{state.email}</span>
                                        </Typography>
                                        <Typography variant="h5" style={{ marginTop: '10px', textAlign: 'center' }}>
                                            <span style={{ color: 'red', marginRight: '10px', marginLeft: '10px' }}>[PHONE NR]</span>
                                            <br />
                                            <span style={{ color: 'white', marginRight: '10px', marginLeft: '10px' }}>{state.phonenumber}</span>
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                            {props.id ? (
                                <div>
                                    <Button onClick={() => assignUser()} style={{ width: '100%', color: isUserAssigned ? 'red' : 'green' }} variant="contained">
                                        {isUserAssigned ? 'UNMARK PROFILE AS SELECTED' : 'MARK PROFILE AS SELECTED'}
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={() => handleEdit(true)} style={{ width: '100%', color: 'green' }} variant="contained">
                                        Edit Profile
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Grid>

                    <Grid item xs={12} xl={7}>
                        <Paper elevation={5} style={{ backgroundColor: '#313131', padding: '25px', color: 'white', textAlign: 'center' }}>
                            <Typography variant="h5" style={{ overflow: 'clip', }}>
                                <span style={{ color: 'red' }}>[CV]</span>
                                <br />
                                <div style={{ textAlign: 'left' }}>
                                    {state.cv}
                                </div>
                            </Typography>
                            <Typography variant="h5" style={{ marginTop: '50px' }}>
                                <span style={{ color: 'red' }}>[Skills]</span>
                                <ul className="design">
                                    {state?.skills?.split(",").map((skill) => {
                                        return (
                                            <li className="design">
                                                {skill}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Typography>

                            <Typography variant="h5" style={{ marginTop: '50px' }}>
                                <span style={{ color: 'red' }}>[Education]</span>
                                <Stepper activeStep={99999} style={{ marginTop: '10px', color: 'white' }} alternativeLabel>
                                    {state?.education?.split(",").map((label) => (
                                        <Step key={label} style={{ color: 'white' }}>
                                            <StepLabel StepIconComponent={CustomStepIcon}><span style={{ color: 'white', fontWeight: 'bold' }}>{label}</span></StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        </div>
    )
};
export default Profile;