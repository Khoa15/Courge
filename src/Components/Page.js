import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import {Container, Box, Typography, TextField, Button, Checkbox} from '@mui/material'
import axios from 'axios'
export default function Page(props){
    const [question, setQuestion] = useState("")
    const [answer, setAns] = useState({1: "", 2: "", 3: "", 4: ""})
    const [check1, setCheck1] = useState(false)    
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)    
    const navigate = useNavigate();
    const handleQuest = quest => setQuestion(!quest)
    const handleCheck1 = check => setCheck1(!check1)
    const handleCheck2 = check => setCheck2(!check2)
    const handleCheck3 = check => setCheck3(!check3)
    const handleCheck4 = check => setCheck4(!check4)
    const handleAns = ans => {
        const index = Number(ans.target.id.charAt([ans.target.id.length - 1]))-1
        setAns({...answer, [index]: ans.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token = localStorage.getItem("token")

            const res = axios({
                url: `${props.nameRes.server}/api/v1/page/`,
                headers:{
                    Authorization: `Bearer ${token}`
                },
                method: 'post',
                data:{
                    question: question,
                    answer: answer,
                    qa:{
                        check1,
                        check2,
                        check3,
                        check4
                    }
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    
    console.log(check1, check2, check3, check4)
    const post = props.post
    return(
        <Container maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', alignItems: 'center', flexDirection: 'column'}} component="form" onSubmit={handleSubmit} noValidate>
                <Typography component="h1" variant="h5">
                    Post your question!
                </Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="question"
                    label="Enter your question"
                    name="question"
                    autoComplete='off'
                    onChange={handleQuest}
                />
                <TextField
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            checked={check1}
                            onChange={handleCheck1}
                        />
                        ),
                    }}
                    fullWidth
                    label="Answer 1"
                    onChange={handleAns}
                />
                <TextField
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            checked={check2}
                            onChange={handleCheck2}
                        />
                        ),
                    }}
                    fullWidth
                    label="Answer 2"
                    onChange={handleAns}
                />
                <TextField
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            checked={check3}
                            onChange={handleCheck3}
                        />
                        ),
                    }}
                    fullWidth
                    label="Answer 3"
                    onChange={handleAns}
                />
                <TextField
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            onChange={handleCheck4}
                            checked={check4}
                        />
                        ),
                    }}
                    fullWidth
                    label="Answer 4"
                    onChange={handleAns}
                />
                <Button type="submit" fullWidth variant="contained" >Send</Button>
            </Box>
        </Container>
    )
}