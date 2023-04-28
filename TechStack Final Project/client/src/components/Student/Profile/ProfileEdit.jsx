import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../index.css'
import { setUserExtensionDataByID } from '../../../service/Service';
import moment from 'moment';

const ProfileEdit = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState(props.data);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({
            ...st,
            [name]: value,
        }));
    }

    const handleUpdateProfile = async () => {
        const data = {
            id: state.id,
            displayname: state.displayname,
            profilepictureurl: state.profilepictureurl,
            dob: state.dob,
            cv: state.cv,
            phonenumber: state.phonenumber,
            skills: state.skills,
            education: state.education
        }

        const res = await setUserExtensionDataByID(data)

        if (res.success) {
            props.snack(true, res.msg, 'success');
            props.onClose();
        } else {
            props.snack(true, res.msg ? res.msg : 'Unknown error occured', 'error')
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result;
            setState((st) => ({
                ...st,
                profilepictureurl: base64String
            }))
        };

        reader.onerror = () => {
            props.snack(true, 'COULD NOT UPLOAD IMAGE', 'error');
        };
    };

    return (
        <div>
            <Grid container spacing={2} style={{ marginTop: '5px' }}>
                <Grid item xs={12}>
                    <TextField
                        label="DISPLAY NAME"
                        name="displayname"
                        onChange={inputChange}
                        value={state.displayname}
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
                    <TextField
                        label="DOB"
                        name="dob"
                        onChange={inputChange}
                        type="date"
                        value={moment(state.dob).format('YYYY-MM-DD')}
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
                        label="PHONE NUMBER"
                        name="phonenumber"
                        value={state.phonenumber}
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
                        label="SKILLS (comma seperated)"
                        name="skills"
                        value={state.skills}
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
                        label="EDUCATION (comma seperated)"
                        name="education"
                        value={state.education}
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
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Ciriculum Vitae"
                        name="cv"
                        value={state.cv}
                        onChange={inputChange}
                        color="secondary"
                        focused
                        multiline
                        rows={5}
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
                    <Button onClick={handleUpdateProfile} style={{ width: '100%', color: 'green' }} variant="contained">
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
export default ProfileEdit;