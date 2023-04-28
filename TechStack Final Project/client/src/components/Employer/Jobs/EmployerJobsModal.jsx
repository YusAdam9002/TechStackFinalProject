import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Tab, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import React, { useEffect, useState } from "react";
import { SetJobs } from "../../../service/Service";
import { Button } from '@mui/material';
import { GetApplications } from '../../../service/Service';
import Profile from '../../Student/Profile/Profile';

const EmployerJobsModal = (props) => {
    const [state, setState] = useState({
        id: null,
        title: '',
        description: '',
        applications: [],

        showUser: false,
    })

    const getApplicationsAndUpdateState = async (id) => {
        const res = await GetApplications(id);
        setState((st) => ({
            ...st,
            applications: res.data,
        }));
    }

    useEffect(() => {
        setState((st) => ({
            ...st,
            id: props.focusedRow?.id ? props.focusedRow?.id : null,
            createdby: props.focusedRow?.createdby ? props.focusedRow?.createdby : null,
            description: props.focusedRow?.description ? props.focusedRow?.description : '',
            displayname: props.focusedRow?.displayname ? props.focusedRow?.displayname : null,
            title: props.focusedRow?.title ? props.focusedRow?.title : ''
        }))

        getApplicationsAndUpdateState(props.focusedRow?.id)
    }, [props.focusedRow])

    const handleFieldChange = (e) => {
        const { name, value } = e.target;

        setState((st) => ({
            ...st,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        const data = {
            id: state.id ? state.id : null,
            userid: localStorage.getItem('USERID'),
            title: state.title,
            description: state.description
        }
        const res = await SetJobs(data);

        if (res.success) {
            props.onClose()
        }
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleShowUser = (va, data) => {
        setState((st) => ({
            ...st,
            focusedApplication: data,
            showUser: va
        }))
    }

    return (
        <div>

            {state.showUser ? (
                <Profile id={state.focusedApplication.userapplying} />
            )
                : (
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" style={{ color: 'white' }}>
                                    <Tab style={{ color: 'white' }} label="Update Job" value="1" />
                                    {state?.applications?.length > 0 && (
                                        <Tab style={{ color: 'white' }} label={`View Applicants ${state.applications?.length}`} value="2" />
                                    )}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} style={{ marginTop: '5px' }}>
                                        <TextField
                                            label="TITLE"
                                            name="title"
                                            value={state.title}
                                            onChange={handleFieldChange}
                                            color="secondary"
                                            focused
                                            multiline
                                            rows={5}
                                            style={{
                                                color: 'white',
                                                width: '100%',
                                                height: '100%'
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
                                        <TextField
                                            label="DESCRIPTION"
                                            name="description"
                                            value={state.description}
                                            onChange={handleFieldChange}
                                            color="secondary"
                                            focused
                                            multiline
                                            rows={5}
                                            style={{
                                                color: 'white',
                                                width: '100%',
                                                height: '100%'
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
                                        <Button onClick={() => handleSubmit()} style={{ width: '100%', color: 'green' }} variant="contained">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                {/* {id, userapplying, jobid, notes, accepted} */}
                                <Grid container spacing={1}>
                                    {state?.applications?.map((app) => {
                                        return (
                                            <Grid item xs={6}>
                                                <Button onClick={() => handleShowUser(true, app)} style={{ width: '100%', color: 'green' }} variant="contained">
                                                    {app.displayname}
                                                </Button>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                )
            }
        </div>
    )
}

export default EmployerJobsModal;