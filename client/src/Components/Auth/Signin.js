import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { signin } from '../../Actions/authActions';
import { getUserDetailsByToken } from '../../Actions/userActions';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

class Signin extends Component {
    constructor(props){ 
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.getUserDetailsByToken(this.props.authenticated).then(() => {
                this.props.history.push("/");
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.signin(this.state).then(() => {
            this.props.getUserDetailsByToken(this.props.authenticated).then(() => {
                this.props.history.push("/");
            });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container justify="center">
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid container justify="center">
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}> 
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onInput={ e=> this.setState({ username: e.target.value })}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onInput={ e=> this.setState({ password: e.target.value })}
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
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                            <Link href="" variant="body2" onClick={() => {this.props.history.push("/Signup")}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
              </div>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, errorMessage: state.auth.errorMessage };
};

export default withStyles(useStyles)(connect(mapStateToProps, { signin, getUserDetailsByToken })(Signin));
