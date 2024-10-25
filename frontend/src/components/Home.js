import React, { useState } from 'react';
import {  Container, Tab, Tabs, Typography } from '@mui/material';
import {Link} from 'react-router-dom'

const Home = () => {
  const [value, setvalue] = useState(0);
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  }
  return (
    <Container sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
      <Typography variant="h3" gutterBottom >
        Welcome to Rule Engine
      </Typography>
      
      <Tabs marginTop={5} value={value} onChange={handleChange} textColor='violet'>
        <Tab LinkComponent={Link} to='/' label='Create-Rule'/>
        <Tab LinkComponent={Link} to='/combine' label='Combie-Rules'/>
        <Tab LinkComponent={Link} to='/evaluate' label='Evaluate-Rule'/>
      </Tabs>
    </Container>
  );
};

export default Home;
