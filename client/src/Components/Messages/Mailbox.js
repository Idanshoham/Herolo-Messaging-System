import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import requireAuth from '../HOCS/requireAuth';
import OperationBox from './OperationBox';
import MessagesList from './MessagesList';
import { signout } from '../../Actions/authActions';
import { getUserDetailsByToken } from '../../Actions/userActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Mailbox = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [inbox, setInbox] = useState(true);
    const { authenticated, user, getUserDetailsByToken, signout } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMessagesShown = inbox => {
      setInbox(!inbox);
    };

    useEffect(() => {
      if (isEmpty(user)) {
        getUserDetailsByToken(authenticated);
      }
    });

    if (!isEmpty(user)) {
      return (
          <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
              <Toolbar className={classes.toolbar}>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                  <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {`Welcome  ${user.username}`}
              </Typography>
              <IconButton color="inherit" onClick={() => { signout() }}>
                  <ExitToAppIcon />
                  Sign Out
              </IconButton>
              </Toolbar>
          </AppBar>
          <Drawer
              variant="permanent"
              classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
              }}
              open={open}
          >
              <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon />
                  </IconButton>
              </div>
              <Divider />
              <OperationBox isDrawerOpen={open} isInbox={inbox} handleMessagesShown={handleMessagesShown}/>
          </Drawer>
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth={false} className={classes.container}>
              <Grid container>
                  <Grid item>
                  <Paper className={classes.paper}>
                    <MessagesList inbox={inbox} />
                  </Paper>
                  </Grid>
              </Grid>
              </Container>
          </main>
          </div>
      );
    }
    else {
      return <div />;
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.user.user };
}

export default withStyles(useStyles)(connect(
    mapStateToProps, { getUserDetailsByToken, signout }
)(requireAuth(Mailbox)));
