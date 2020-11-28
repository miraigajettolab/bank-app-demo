import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TuneIcon from '@material-ui/icons/Tune';

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
          <IconButton edge="start" className={classes.menuButton} id="AdminComplex" color="inherit" aria-label="menu" onClick={e => props.go(e)}> 
            <DeveloperBoardIcon id="AdminComplex" style={{marginRight: "5px"}}/>
            <Typography id="AdminComplex" variant="h6" className={classes.title}>
                Обзор
            </Typography>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} id="AdminManage" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <TuneIcon id="AdminManage" style={{marginRight: "5px"}}/>
            <Typography id="AdminManage"  variant="h6" className={classes.title}>
                Управление
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