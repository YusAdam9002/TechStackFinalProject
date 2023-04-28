import { Alert, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { handleGetSessionToken, timeout } from '../../service/Service';

const Login = (props) => {
    const navigate = useNavigate();

    const passwordRef = useRef(null);

    const [state, setState] = useState({
        username: '',
        password: '',

        showToast: false,
        toastMsg: '',
        toastSev: '',
    });

    const handleLogin = async () => {
        const data = { username: state.username, password: state.password };
        const res = await handleGetSessionToken(data)

        if (res.success) {
            setState((st) => ({
                ...st,
                showToast: true,
                toastMsg: res.msg,
                toastSev: 'success'
            }))

            await timeout(1000);

            localStorage.setItem("TOKEN", res.data[0].token)
            localStorage.setItem("USERID", res.data[0].id)
            localStorage.setItem("ROLE", res.data[0].role)

            navigate('/', { replace: true });
            window.location.reload();
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
        const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleLogin();
            }
        };

        passwordRef.current.addEventListener('keypress', handleEnterKeyPress);

        return () => {
            passwordRef.current.removeEventListener('keypress', handleEnterKeyPress);
        };
    }, []);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({ ...st, [name]: value }));
    };

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={state.showToast} autoHideDuration={3000} onClose={() => setState((st) => ({ ...st, showToast: false }))}>
                <Alert onClose={() => setState((st) => ({ ...st, showToast: false }))} severity={state.toastSev} sx={{ width: '100%' }}>
                    {state.toastMsg}
                </Alert>
            </Snackbar>

            <div className="center">
                <Paper elevation={20} style={{ width: '500px', height: '310px', backgroundColor: '#313131' }}>
                    <div style={{ padding: '25px' }}>
                        <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
                            LOGIN
                        </Typography>
                        <hr />
                        <Grid container spacing={2} style={{ marginTop: '5px' }}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <TextField
                                    label="PASSWORD"
                                    name="password"
                                    type="password"
                                    color="secondary"
                                    inputRef={passwordRef}
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
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{
                                        width: '100%',
                                        marginTop: '5px'
                                    }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{ color: 'red', fontWeight: 'bold', textAlign: 'right' }}>
                                    <span
                                        onClick={() => {
                                            navigate('/register', { replace: true });
                                        }}
                                        style={{ cursor: 'pointer', }}
                                    >
                                        go to register
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
export default Login;