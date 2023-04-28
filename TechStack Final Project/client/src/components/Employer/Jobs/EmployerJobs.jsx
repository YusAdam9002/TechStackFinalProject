import { ChevronRight } from '@mui/icons-material';
import { Breadcrumbs, Dialog, IconButton, InputBase, Link, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { AccordionDetails } from '@mui/material';
import { Button } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { FilterJobsByEmployer, FilterJobsByUser } from '../../../service/Service';
import EmployerJobsModal from './EmployerJobsModal';

const EmployerJobs = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        jobs: [],
        filter: '',

        showModal: false,
        focusedRow: null,
    });

    const getJobsAndUpdateState = async () => {
        const res = await FilterJobsByEmployer(localStorage.getItem('USERID'), state.filter);
        if (res.success) {
            setState((st) => ({
                ...st,
                jobs: res.data,
            }));
        }
    }

    useEffect(() => {
        getJobsAndUpdateState()
    }, [state.filter, state.focusedRow]);

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

    const handleClose = () => {
        getJobsAndUpdateState()
        setState((st) => ({
            ...st,
            showModal: false,
            focusedRow: null
        }));
    }

    return (
        <div style={{ padding: '15px', marginLeft: "25px" }}>

            {state.showModal ?
                <Dialog maxWidth="xl" fullWidth onClose={() => handleShow(false, null)} open={state.showModal}>
                    <DialogTitle style={{ backgroundColor: '#313131', color: 'white', justifyContent: 'space-between' }}>
                        {state.focusedRow ? 'Update Job Listing' : 'Add Job Listing'}
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#313131', color: 'white' }}>
                        <EmployerJobsModal onClose={() => handleClose()} focusedRow={state.focusedRow} />
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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => handleShow(true, null)} style={{ width: '25%', color: 'green' }} variant="contained">
                    Add New Job Listing
                </Button>
            </div>

            <div style={{ padding: '50px' }}>
                <div style={{ height: '100px' }}>
                    <div style={{ marginBottom: '5px', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                        {state.filter == '' ? `Showing all (${state?.jobs?.length}) jobs` : `Showing filtered (${state?.jobs?.length}) jobs`}
                    </div>
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }} style={{ justifyContent: 'space-between', display: 'flex' }} >
                        <InputBase
                            name="filter"
                            value={state.filter}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search jobs by description or title"
                            inputProps={{ 'aria-label': 'search users' }}
                            onChange={inputChange}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                </div>

                <div style={{}}>
                    <Grid container spacing={1}>
                        {state?.jobs?.map((job, i) => {
                            return (
                                <Grid item xl={4} md={6} xs={12} key={i}>
                                    <Accordion defaultExpanded={true} style={{ backgroundColor: '#313131', color: 'white' }}>
                                        <AccordionSummary expandIcon={<ExpandMore style={{ color: 'white', }} />} aria-controls="panel1a-content" id="panel1a-header" >
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                {job.title}
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

export default EmployerJobs;