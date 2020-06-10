import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';

import { editUserDetails } from '../Actions/userActions';

class EditUserDetails extends Component {
    constructor(props){ 
        super(props);

        this.state = {
            username: props.user.username,
            newName: props.user.name ? props.user.name : '',
            oldPassword: '',
            newPassword: '',
        }
    }
    
    handleSubmit = event => {
        const { editUserDetails, handleClose } = this.props;
        event.preventDefault();
        editUserDetails(this.state).then(() => {
            handleClose(true);
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.main}>
                    <Grid container justify="center">
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                    </Grid>
                    <Grid container justify="center">
                        <Typography component="h1" variant="h5">
                            Compose New Message
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        autoComplete="username"
                        name="username"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="username"
                        label="Username"
                        value={this.state.username}
                        autoFocus
                        />
                        <TextField
                        autoComplete="newName"
                        name="newName"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="newName"
                        label="Name"
                        value={this.state.newName}
                        onInput={ e=> this.setState({ newName: e.target.value })}
                        autoFocus
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="oldPassword"
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        onInput={ e=> this.setState({ oldPassword: e.target.value })}
                        autoComplete="current-password"
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        type="password"
                        onInput={ e=> this.setState({ newPassword: e.target.value })}
                        autoComplete="current-password"
                        />
                        <Typography align="center" color="error">
                            {this.props.errorMessage}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon />}
                            className={classes.submit}
                        >
                            Send
                        </Button>
                    </form>
              </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user, errorMessage: state.user.errorMessage };
}

export default connect(mapStateToProps, { editUserDetails })(EditUserDetails);