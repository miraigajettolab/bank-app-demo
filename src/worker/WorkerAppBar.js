import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TuneIcon from '@material-ui/icons/Tune';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  //you have to provide id in all three places
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} id="WorkerManageClients" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <GroupIcon id="WorkerManageClients" style={{marginRight: "5px"}}/>
            <Typography id="WorkerManageClients"  variant="h6" className={classes.title}>
                Клиенты
            </Typography>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} id="WorkerManageBankAccounts" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <GroupIcon id="WorkerManageBankAccounts" style={{marginRight: "5px"}}/>
            <Typography id="WorkerManageBankAccounts"  variant="h6" className={classes.title}>
                Счета
            </Typography>
          </IconButton>
            <Typography variant="h6" className={classes.title}>
            </Typography>
          <Button color="inherit" onClick={props.logout}>Выйти</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}