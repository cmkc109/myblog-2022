import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { Paper, Grid, Typography, Container, Avatar, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import useStyles from './styles.js'
import Input from './Input.jsx'
import Icon from './icon.js';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: "600249018771-qq56v723tade8laavu6cltqlv497ule8.apps.googleusercontent.com",
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);
  


    const handleSubmit = (e) => {
       e.preventDefault()

       if (isSignup) {
        console.log('signeed up')
        // dispatch(signup(form, navigate));
      } else {
        console.log('not signeed up')
        // dispatch(signin(form, navigate));
      }
    }

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false);
      };
    
    const googleSuccess = async (res) => {
       const result = res?.profileObj;
       const token = res?.tokenId;

       try {
        dispatch({ type: "AUTH", data: { result, token } });
        navigate('/');

       } catch(error) {
        console.log(error);
       }
    };

    const googleFailure = (error) => {
      console.log(error)
    };

  return (
   <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
         <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            
            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            
            <GoogleLogin
            clientId="600249018771-qq56v723tade8laavu6cltqlv497ule8.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color="primary" fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained">
                Google Sign In
              </Button>  
            )}  
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />  
          
         </Grid>
         <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>   
        </form>
       
        </Paper>
   </Container>
  )
}

export default Auth