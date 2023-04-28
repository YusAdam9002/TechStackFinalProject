import { Button, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { GetApplications, SetApplications } from '../../../service/Service';
import { TextField } from '@mui/material';

const StudentJobsModal = (props) => {

    const [state, setState] = useState({
        applications: [],
        notes: '',
    });

    const handleSubmit = () => {
        const data = {
            id: hasUserApplied ? getUserApplicationID : null,
            userapplying: localStorage.getItem('USERID'),
            jobid: props.data.id,
            notes: state.notes,
            accepted: null,
            apply: hasUserApplied ? false : true
        }
        
        const res = SetApplications(data);

        getApplicationsAndUpdateState()
    }

    useEffect(() => {
        getApplicationsAndUpdateState()
    }, [props?.data?.id])

    const getApplicationsAndUpdateState = async () => {
        const res = await GetApplications(props?.data?.id);
        setState((st) => ({
            ...st,
            applications: res.data,
            notes: getUserNoteFromApplication
        }));
    }

    // Bad code, replace with get all data at once from response
    const hasUserApplied = useMemo(() => {
        let applied = false;

        state.applications?.map((appl) => {
            if (appl.userapplying == localStorage.getItem('USERID')) {
                applied = true;
            }
        })

        return applied;
    })
    const getUserApplicationID = useMemo(() => {
        let id = null;

        state.applications?.map((appl) => {
            if (appl.userapplying == localStorage.getItem('USERID')) {
                id = appl.id
            }
        })

        return id;
    })
    const getUserNoteFromApplication = useMemo(() => {
        let notes = null;

        state.applications?.map((appl) => {
            if (appl.userapplying == localStorage.getItem('USERID')) {
                notes = appl.notes
            }
        })

        return notes ? notes : '';
    })


    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({
            ...st,
            [name]: value,
        }));
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {state?.applications?.length > 0 ?
                        <span style={{ color: 'cyan' }}>{state?.applications?.length} Total Applications</span>
                        :
                        <span style={{ color: 'red' }}>No Applications</span>
                    }
                </Grid>
                <Grid item xs={12}>
                    <br />
                    <span style={{ color: 'red' }}>Job Description:</span>
                    <br />
                    {props?.data?.description}
                </Grid>
                <Grid item xs={12}>
                    <br />
                    <TextField
                        disabled={hasUserApplied}
                        label="COVER PAGE"
                        name="notes"
                        value={state.notes}
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
                                    color: 'white',
                                    backgroundColor: '#222222',
                                    outline: '1px black solid',
                                    padding: '10px',
                                }
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => handleSubmit()} style={{ width: '100%', color: hasUserApplied ? 'red' : 'green' }} variant="contained">
                        {hasUserApplied ? 'Remove Application' : 'Apply For Job'}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default StudentJobsModal;