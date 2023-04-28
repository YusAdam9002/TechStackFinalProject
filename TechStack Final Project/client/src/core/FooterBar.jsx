import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FooterBar = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({

    });

    useEffect(() => {

    }, []);

    return (
        <Paper
            style={{
                color: 'white',
                left: 0,
                bottom: 0,
                position: 'fixed',
                zIndex: 99,
                width: '100%',
                height: '80px',
                backgroundColor: '#313131',
                padding: '10px',
            }}
            elevation={2}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    footer content
                </div>
                <div style={{marginRight: '30px', marginTop: '50px'}}>
                    @PLCMNT LTD
                </div>
            </div>
        </Paper>
    );
};
export default FooterBar;