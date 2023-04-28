import ChevronRight from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({

  });

  useEffect(() => {

  }, []);

  return (
    <div style={{ padding: '15px', marginLeft: "25px" }}>
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

      {/* INSERT HOME CONTENT HERE */}
      <div style={{ padding: '50px' }}>
        <Typography style={{ fontWeight: 'bold', fontSize: '17px', }}>
          Welcome to Software Plcmnt, the ultimate platform for employers to find the best software professionals for their companies. Our website connects employers with top-notch talent in the tech industry, providing an efficient and effective way to fill job vacancies.
          <br /><br />
          Our platform features employee profiles that showcase each candidate's unique skills, experience, and education. Employers can easily browse through these profiles, filtering by specific criteria to find the ideal candidate for their company. With Software Plcmnt, employers have access to a diverse pool of talented software professionals from around the world, all in one place.
          <br /><br />
          We understand that finding the right employee can be a time-consuming and challenging task. That's why we've designed our platform to streamline the hiring process, making it easier and more efficient for both employers and job seekers. Our user-friendly interface allows employers to post job vacancies, manage applications, and communicate with potential candidates all in one place.
          <br /><br />
          At Software Plcmnt, we're committed to connecting top talent with the best companies in the tech industry. Whether you're an employer looking to fill a vacancy or a job seeker looking for your next career opportunity, we're here to help you succeed. Join our community today and take the first step towards finding your perfect match.
          <br /><br />
          Software Plcmnt is more than just a job board. We understand that finding the right fit for your company requires more than just a resume or a list of skills. That's why we've developed a comprehensive employee profile system that allows candidates to showcase their personalities, values, and work preferences. Employers can get a better sense of each candidate's fit with their company culture, making it easier to find the perfect match.
          <br /><br />
          Our platform is designed to support the entire hiring process, from posting job listings to negotiating employment terms. We provide employers with tools to manage candidate applications, schedule interviews, and even conduct background checks. Our platform integrates with popular ATS systems, making it easy to track candidates throughout the hiring process.
          <br /><br />
          In addition to our robust features for employers, we also offer career development resources for job seekers. Our platform includes educational resources, career coaching services, and a community of software professionals to connect with. We believe that helping candidates grow their careers will ultimately lead to better matches for our employers.
          <br /><br />
          At Software Plcmnt, we're committed to providing a positive and inclusive experience for all users. We promote diversity and inclusion in hiring practices and encourage employers to create equitable job listings. We believe that a diverse workforce leads to better innovation and a stronger bottom line.
          <br /><br />
          Join our platform today and see the difference that Software Plcmnt can make in your hiring process. Our team is always available to support you along the way.
          <br /><br />
        </Typography>
      </div>
    </div >
  );
};
export default Home;