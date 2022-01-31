import * as React from 'react';
import {Container, Box, Grid, TextField, Button, Link, Typography, Alert} from '@mui/material'
import {useNavigate} from 'react-router-dom';
import AppContext from './AppContext';
import axios from 'axios';
const Login = (props) =>{
    const navigate = useNavigate();
    const {name, server} = props.nameRes
    const {dispatch} = React.useContext(AppContext)
    const [userInput, setUserInput] = React.useState({email: "", password: ""})
    const [errorMessage, setErrorMessage] = React.useState(null)
    const handleChangeInput = (e) =>{
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const option = {
                method: 'post',
                url: server+'/api/v1/auth/login',
                data: userInput
            }
            const response = await axios(option)
            const token = response.data.accessToken
            const userName = response.data.userName
            const permission = response.data.permission
            const id = response.data.id
            localStorage.setItem("token", token)
            dispatch({type: "CURRENT_USER", payload: {userName, permission, id}})
            navigate(name)
        }catch(error){
            setErrorMessage(error.response.data.message)
        }
    };
    
    React.useEffect(()=>{
        document.title="Sign In"
    })
    return(
        <Container maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', alignItems: 'center', flexDirection: 'column'}} component="form" noValidate onSubmit={handleSubmit}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {errorMessage && (<Alert severity="error">{errorMessage}</Alert>)}
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete='off'
                    onChange={handleChangeInput}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete='current-password'
                    onChange={handleChangeInput}
                />
                <Button type="submit" fullWidth variant="contained">Sign In</Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component="button" onClick={()=>navigate(`${name}/register.html`)}>Don't have an account? Sign Up</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Login;