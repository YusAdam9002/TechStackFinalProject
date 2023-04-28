import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const navigate = useNavigate();

    const token = useMemo(() => {
        return localStorage.getItem('TOKEN');
    }, [localStorage.getItem('TOKEN')])

    useEffect(() => {
        if (token == null) {
            navigate('/login', { replace: true });
        } else {
            navigate('/home', { replace: true });
        }
    }, [token]);

};
export default LandingPage;