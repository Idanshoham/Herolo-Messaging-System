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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import requireAuth from '../HOCS/requireAuth';
import OperationBox from './OperationBox';
import MessagesList from './MessagesList';
import EditUserDetails from '../EditUserDetails';
import { signout } from '../../Actions/authActions';
import { getUserDetailsByToken, clearUser } from '../../Actions/userActions';
import { getAllReceivedMessages, getAllSentMessages, deleteMessage, clearMessages } from '../../Actions/messageActions';

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
    alignItems: 'center',
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  main: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Mailbox = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [inbox, setInbox] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const { authenticated, user, messagesReceived, messagesSent, 
      getUserDetailsByToken, clearUser, getAllReceivedMessages, getAllSentMessages, deleteMessage, clearMessages, signout } = props;

    const handleModalOpen = () => {
      setOpenModal(true);
    };
  
    const handleModalClose = () => {
      setOpenModal(false);
    };

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
      if (authenticated && isEmpty(user)) {
        getUserDetailsByToken(authenticated);
      } else if (authenticated) {
        if (inbox) {
          if (messagesReceived === undefined) {
            handleGetAllReceviedMessages(user.username);
          } 
        } else {
          if (messagesSent === undefined) {
            handleGetAllSentMessages(user.username);
          } 
        }
      }
    });

    const handleGetAllReceviedMessages = username => {
      getAllReceivedMessages({ username });
    }
  
    const handleGetAllSentMessages = username => {
      getAllSentMessages({ username });
    }

    const handleAddition = () => {
      handleGetAllSentMessages(user.username);
    }

    const handleDelete = (messageId, messages) => {
      const newMessages = messages.map(message => {
        if (messages._id !== messageId)
          return message;
      });
      deleteMessage(messageId, !inbox).then(() => {
        if (inbox) {
          if (newMessages.length < messagesReceived.length) {
            handleGetAllReceviedMessages(user.sername);
          } 
        } else {
          if (newMessages.length < messagesSent.length) {
            handleGetAllSentMessages(user.username);
          } 
        }
      });
    }

    const clearStore = () => {
      clearMessages();
      clearUser();
      signout();
    }

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
                Welcome
                <IconButton color="inherit" size="small" onClick={handleModalOpen}>{user.username}</IconButton>
                <Modal
                className={classes.modal}
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModal}>
                  <div className={classes.modalPaper}>
                    <EditUserDetails classes={classes} handleClose={handleModalClose}/>
                    {/* <NewMessage receiver={message.sender} classes={classes} inbox={isInbox} handleClose={handleClose}/> */}
                  </div>
                </Fade>
              </Modal>
              </Typography>
              <IconButton color="inherit" onClick={() => { clearStore() }}>
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
              <OperationBox isDrawerOpen={open} isInbox={inbox} handleAddition={handleAddition} handleMessagesShown={handleMessagesShown}/>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
              <Grid container style={{ display: 'grid' }}>
                <Grid item>
                  <Paper className={classes.paper}>
                    <MessagesList messages={inbox ? messagesReceived : messagesSent } isInbox={inbox} handleAddition={handleAddition} handleDelete={handleDelete}/>
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
    return { authenticated: state.auth.authenticated, user: state.user.user, messagesReceived: state.messages.messagesReceived, messagesSent: state.messages.messagesSent };
}

export default withStyles(useStyles)(connect(
    mapStateToProps, { getUserDetailsByToken, clearUser, getAllReceivedMessages, getAllSentMessages, deleteMessage, clearMessages, signout }
)(requireAuth(Mailbox)));
