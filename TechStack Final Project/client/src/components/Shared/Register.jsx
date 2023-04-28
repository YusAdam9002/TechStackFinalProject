import { Alert, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { getAllRoles, handleRegister, timeout } from '../../service/Service';

const Register = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        roles: [],
        username: '',
        displayName: '',
        password: '',
        email: '',
        profilePictureUrl: '',
        role: null,

        showToast: false,
        toastMsg: '',
        toastSev: '',
    });

    const registerUser = async () => {
        const data = {
            username: state.username,
            password: state.password,
            email: state.email,
            displayname: state.displayName,
            profilepictureurl: state.profilePictureUrl,
            role: state.role
        }
        const res = await handleRegister(data);

        if (res.success) {
            setState((st) => ({
                ...st,
                showToast: true,
                toastMsg: res.msg,
                toastSev: 'success'
            }))

            await timeout(1000);

            navigate('/login', { replace: true });
        } else {
            setState((st) => ({
                ...st,
                showToast: true,
                toastMsg: res.msg,
                toastSev: 'error'
            }))
        }
    }

    useEffect(() => {
        getRolesAndUpdateState();
    }, []);

    const getRolesAndUpdateState = async () => {
        const res = await getAllRoles();

        if (res.success) {
            setState((st) => ({
                ...st,
                roles: res.data,
            }));
        }
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({
            ...st,
            [name]: value,
        }));
    }

    useEffect(() => {
    }, [state]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
    
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = () => {
            const base64String = reader.result;
            setState((st) => ({
                ...st,
                profilePictureUrl: base64String
            }))
        };
    
        reader.onerror = () => {
            setState((st) => ({
                ...st,
                showToast: true,
                toastMsg: 'Could not upload image',
                toastSev: 'error'
            }))
        };
    };

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={state.showToast} autoHideDuration={3000} onClose={() => setState((st) => ({ ...st, showToast: false }))}>
                <Alert onClose={() => setState((st) => ({ ...st, showToast: false }))} severity={state.toastSev} sx={{ width: '100%' }}>
                    {state.toastMsg}
                </Alert>
            </Snackbar>

            <div className="center">
                <Paper elevation={3} style={{ marginBottom: '-600px', backgroundColor: '#313131' }}>
                    <div style={{ padding: '25px' }}>
                        <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
                            REGISTER
                        </Typography>
                        <hr />
                        <Grid container spacing={2} style={{ marginTop: '5px' }}>
                            <Grid item xs={6}>
                                <TextField
                                    label="USERNAME"
                                    name="username"
                                    onChange={inputChange}
                                    color="secondary"
                                    focused
                                    style={{
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    sx={{
                                        color: 'white',
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#222222',
                                                outline: '1px black solid',
                                                padding: '10px',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="FULL NAME"
                                    name="displayName"
                                    onChange={inputChange}
                                    color="secondary"
                                    focused
                                    style={{
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    sx={{
                                        color: 'white',
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#222222',
                                                outline: '1px black solid',
                                                padding: '10px',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="PASSWORD"
                                    name="password"
                                    type="password"
                                    color="secondary"
                                    onChange={inputChange}
                                    focused
                                    style={{
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    sx={{
                                        color: 'white',
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#222222',
                                                outline: '1px black solid',
                                                padding: '10px',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="EMAIL"
                                    name="email"
                                    onChange={inputChange}
                                    color="secondary"
                                    focused
                                    style={{
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    sx={{
                                        color: 'white',
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#222222',
                                                outline: '1px black solid',
                                                padding: '10px',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="PROFILE PICTURE"
                                    name="profilePictureUrl"
                                    onChange={handleImageUpload}
                                    color="secondary"
                                    type="file"
                                    focused
                                    style={{
                                        color: 'white',
                                        width: '100%',
                                    }}
                                    sx={{
                                        color: 'white',
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#222222',
                                                outline: '1px black solid',
                                                padding: '10px',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel style={{ fontWeight: 'bold', color: 'white' }}>Role</FormLabel>
                                    <RadioGroup style={{ color: 'white' }} row>
                                        {state?.roles?.map((role) => {
                                            return (
                                                <FormControlLabel value={role.id} control={<Radio />} label={role.name} name="role" onChange={inputChange} />
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px',
                                        fontWeight: 'bold',
                                        color: "black"
                                    }}
                                    onClick={registerUser}
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{ color: 'red', fontWeight: 'bold', textAlign: 'right' }}>
                                    <span
                                        onClick={() => {
                                            navigate('/login', { replace: true });
                                        }}
                                        style={{ cursor: 'pointer', }}
                                    >
                                        go to login
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </div>
        </div>
    );
};
export default Register;