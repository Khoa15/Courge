import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from './Dashboard'
import Users from './Users'
import Courses from './Courses'
import { Container, Grid, Paper, Card, CardContent, List, ListItem, Button, Link } from '@mui/material';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const nameRes = props.nameRes
  const [value, setValue] = React.useState(0);

  const con = "contained"
  const out = "outlined"
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ textAlign: 'left', marginTop: 10 }}>
        <Grid item sm={3} xs={12}>
          <Paper variant="outlined">
            <List>
               <ListItem>
                  <Button fullWidth variant={(!value) ? con : out } onClick={() => setValue(0)}>Dashboard</Button>
                </ListItem>
              <ListItem>
                <Button fullWidth variant={(value==1) ? con : out} onClick={() => setValue(1)}>Courses</Button>
              </ListItem>
              <ListItem>
                <Button fullWidth variant={(value==2) ? con : out} onClick={() => setValue(2)}>Users</Button>
              </ListItem>
              <ListItem>
                <Link href="/" >Home page</Link>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {!value && <Dashboard nameRes={nameRes} />}
        {value==1 && <Courses nameRes={nameRes} />}
        {value==2 && <Users nameRes={nameRes} />}

      </Grid>
    </Container>
  );
}
