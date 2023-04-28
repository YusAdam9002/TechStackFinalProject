import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs, Dialog, IconButton, InputBase, Link, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { FilterJobs } from '../../../service/Service';
import { Grid } from '@mui/material';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { AccordionDetails } from '@mui/material';
import { Button } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import StudentJobsModal from './StudentJobsModal';

const StudentJobs = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        jobs: [],
        filter: '',

        showModal: false,
        focusedRow: null,
    });

    const getJobsAndUpdateState = async () => {
        const res = await FilterJobs(state.filter == '' ? '' : state.filter);
        setState((st) => ({
            ...st,
            jobs: res.data,
        }));
    }

    useEffect(() => {
        getJobsAndUpdateState()
    }, [state.filter]);

    const inputChange = (e) => {
        const { name, value } = e.target;

        setState((st) => ({
            ...st,
            [name]: value,
        }));
    }

    const handleShow = (va, data) => {
        setState((st) => ({
            ...st,
            showModal: va,
            focusedRow: data
        }));
    }

    return (
        <div style={{ padding: '15px', marginLeft: "25px" }}>

            {state.showModal ?
                <Dialog onClose={() => handleShow(false, null)} open={state.showModal}>
                    <DialogTitle style={{ backgroundColor: '#313131', color: 'white', justifyContent: 'space-between' }}>
                        <div>
                            View Additional Job Info
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#313131', color: 'white' }}>
                        <StudentJobsModal onClose={() => handleShow(false, null)} data={state.focusedRow} />
                    </DialogContent>
                </Dialog>
                : null}

            <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: 'cyan' }}> <ChevronRight style={{ marginTop: '5px' }} /> </span>}>
                <Link color="secondary" href="/">
                    PLCMNT
                </Link>
                <Link color="secondary" href="/">
                    HOME
                </Link>
                <Link color="secondary" href="/">
                    HOME
                </Link>
            </Breadcrumbs>

            <div style={{ padding: '50px' }}>
                <div style={{ marginBottom: '5px', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                    {state.filter == '' ? `Showing all (${state.jobs.length}) jobs` : `Showing filtered (${state.jobs.length}) jobs`}
                </div>

                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }} style={{ justifyContent: 'space-between', display: 'flex' }} >
                    <InputBase
                        name="filter"
                        value={state.filter}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search jobs by description, title or uploader"
                        inputProps={{ 'aria-label': 'search users' }}
                        onChange={inputChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                </Paper>

                <div style={{ marginTop: '50px' }}>
                    <Grid container spacing={3}>
                        {state.jobs.map((job) => {
                            return (
                                <Grid item xl={4} md={6} xs={12}>
                                    <Accordion defaultExpanded={true} style={{ backgroundColor: '#313131', color: 'white' }}>
                                        <AccordionSummary expandIcon={<ExpandMore style={{ color: 'white', }} />} aria-controls="panel1a-content" id="panel1a-header" >
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                {job.title}
                                                <br />
                                                Uploaded By: {job.displayname}
                                            </Typography>
                                        </AccordionSummary>

                                        <hr style={{ backgroundColor: '#282828' }} />

                                        <AccordionDetails>
                                            <Button onClick={() => handleShow(true, job)} style={{ width: '100%', color: 'green' }} variant="contained">
                                                View More Job Info
                                            </Button>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            )
                        })}

                    </Grid>
                </div>
            </div>
        </div >
    );
};

export default StudentJobs;