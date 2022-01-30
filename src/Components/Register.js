import * as React from 'react'
import {Container, Box, Grid, TextField, Button, Link, Typography, Alert} from '@mui/material'
import {useNavigate} from 'react-router-dom';
import AppContext from './AppContext';
import axios from 'axios';
const Register = (props) =>{
    const navigate = useNavigate()
    const {dispatch} = React.useContext(AppContext)
    const [userInput, setUserInput] = React.useState({name: '', email: '', password: ''})
    const [errorMessage, setErrorMessage] = React.useState(null)
    const handleInputChange = (e) =>{
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            const option = {
                method: 'post',
                url: '/api/v1/auth/register',
                data: userInput
            }
            const response = await axios(option)
            const token = response.data.accessToken
            const id = response.data.id
            const userName = response.data.userName
            const permission = response.data.permission
            localStorage.setItem("token", token)
            dispatch({type: "CURRENT_USER", payload: {id, userName, permission}})
            navigate("/")
        }catch(error){
            setErrorMessage(error.response.data.message)
        }
    }
    React.useEffect(()=>{
        document.title = "Sign up"
    })
    return (
        <Container maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', alignItems: 'center', flexDirection: 'column'}} component="form" noValidate onSubmit={handleSubmit}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {errorMessage && (Array.isArray(errorMessage) ? (errorMessage.map((error)=>(<Alert severity="error" key={error}>{error}</Alert>))) : <Alert severity="error">{errorMessage}</Alert> )}
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="name"
                    label="Username"
                    name="name"
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    label="Email address"
                    name="email"
                    autoComplete='off'
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />
                <Button type="submit" fullWidth variant="contained">Sign Up</Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login.html">Already have an account? Sign In</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Register;