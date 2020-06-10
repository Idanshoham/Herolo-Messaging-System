import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';

import { writeMessage } from '../../Actions/messageActions';

class NewMessage extends Component {
    constructor(props){ 
        super(props);

        this.state = {
            sender: props.username,
            receiver: props.receiver ? props.receiver : '',
            subject: '',
            message: '',
        }
    }
    
    handleSubmit = event => {
        const { writeMessage, handleClose } = this.props;
        event.preventDefault();
        writeMessage(this.state).then(() => {
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
                            <EmailIcon />
                        </Avatar>
                    </Grid>
                    <Grid container justify="center">
                        <Typography component="h1" variant="h5">
                            Compose New Message
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        autoComplete="receiver"
                        name="receiver"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="receiver"
                        label="To"
                        onInput={ e=> this.setState({ receiver: e.target.value })}
                        autoFocus
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        onInput={ e=> this.setState({ subject: e.target.value })}
                        autoComplete="subject"
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={5}
                        rowsMax={20}
                        id="message"
                        label="Context"
                        name="message"
                        onInput={ e=> this.setState({ message: e.target.value })}
                        autoComplete="message"
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
    return { username: state.user.user.username };
}

export default connect(mapStateToProps, { writeMessage })(NewMessage);
