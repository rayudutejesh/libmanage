import React,{useState} from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Books from './Books'
import Authors from './Authors'
import AddBook from './AddBook'
import NavBar from "./NavBar";

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
        <Container>
        <Box>   

            {children}
        </Box>
        </Container>

      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:"#13171a",
    display: 'flex',
    width:"100%",
    minHeight:"100vh",
    flexDirection:'column',
  
  },
  tabs:{
    display: 'flex',
    flexDirection:'row',
    minHeight: '90vh',
    width: '100%',
  },
  tab: {
    color:"#fff",
    boxShadow: '0 3px 5px 2px rgba(0, 153, 97, .5)',
    minHeight: '90vh',
    minWidth:'15ch',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleExpand =(prev)=>{
    setExpanded(!prev);
    console.log(expanded);
  };                         //setting menuIcon click state

  return (
    <div className={classes.root}>
      <NavBar name ="Dashboard" expand = {expanded} click={handleExpand}/>
    <div className={classes.tabs}>
     {expanded && <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tab}
        position ="fixed"
        indicatorColor="secondary"
     
        >
        <Tab label="Authors" {...a11yProps(0)} />
        <Tab label="Books" {...a11yProps(1)} />
        <Tab label="Add Book" {...a11yProps(2)} />
      </Tabs>}
      <TabPanel value={value} index={0}>
        <Authors/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Books/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddBook/>
      </TabPanel>
      </div>
    </div>
  );
}
