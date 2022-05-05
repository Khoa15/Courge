import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import {Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel} from '@mui/material'
import axios from 'axios'
export default function Page(props){
    const stsbtn = {name: "Send", sts: "outlined"}
    const [question, setQuestion] = useState({data: "", error: ""})
    const [answer, setAns] = useState({1: "", 2: "", 3: "", 4: ""})
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [liscense, setLiscense] = useState(false)
    const [statusButton, setStatusButton] = useState(stsbtn)
    const navigate = useNavigate();
    const handleQuest = quest => setQuestion({...question, data: quest.target.value})
    const handleCheck1 = () => setCheck1(!check1)
    const handleCheck2 = () => setCheck2(!check2)
    const handleCheck3 = () => setCheck3(!check3)
    const handleCheck4 = () => setCheck4(!check4)
    const handleLiscense = () => setLiscense(!liscense)
    const handleAns = ans => {
        const index = Number(ans.target.id.charAt([ans.target.id.length - 1]))-1
        setAns({...answer, [index]: ans.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatusButton({name: "Sending", sts: "contained"})
        try{
            console.log(123)
            if(liscense === false || question === "" || !Object.values(answer).reduce((a, b) => a * b)){
                return setStatusButton({name: "Error", sts: "contained"});
            }
            console.log(question.data)
            const token = localStorage.getItem("token")

            const res = axios({
                url: `${props.nameRes.server}/api/v1/page/`,
                headers:{
                    Authorization: `Bearer ${token}`
                },
                method: 'post',
                data:{
                    question: question.data,
                    answer: Object.values(answer),
                    qa:[
                        check1,
                        check2,
                        check3,
                        check4
                    ]
                }
            })
        }catch(error){
            console.log(error)
        }
        setStatusButton(stsbtn)
    }
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setStatusButton(stsbtn)
        }, 1500)
        return () => clearTimeout(timer)
    }, [statusButton])
    
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
                    value={question.data}
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
                    value={answer[1]}
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
                    value={answer[2]}
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
                    value={answer[3]}
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
                    value={answer[4]}
                />
                <FormControlLabel
                    margin="normal"
                    control={
                        <Checkbox
                            checked={liscense}
                            onChange={handleLiscense}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label="Aye, hy vọng câu hỏi bạn post lên là chính xác"
                />
                <Button type="submit" fullWidth variant={statusButton.sts} >{statusButton.name}</Button>
            </Box>
        </Container>
    )
}