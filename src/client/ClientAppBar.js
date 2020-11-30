import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FindInPageIcon from '@material-ui/icons/FindInPage';

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
          <IconButton edge="start" className={classes.menuButton} id="ClientViewAccount" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <AccountBoxIcon id="ClientViewAccount" style={{marginRight: "5px"}}/>
            <Typography id="ClientViewAccount"  variant="h6" className={classes.title}>
                Аккаунт
            </Typography>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} id="ClientManageTransactions" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <SendIcon id="ClientManageTransactions" style={{marginRight: "5px"}}/>
            <Typography id="ClientManageTransactions"  variant="h6" className={classes.title}>
                Транзакции
            </Typography>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} id="ViewServices" color="inherit" aria-label="menu" onClick={e => props.go(e)}>
            <FindInPageIcon id="ViewServices" style={{marginRight: "5px"}}/>
            <Typography id="ViewServices"  variant="h6" className={classes.title}>
                Услуги
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