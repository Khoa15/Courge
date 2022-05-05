import { Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import {useEffect, useCallback, useContext, useState} from 'react'
import AppContext from '../AppContext'
import PostItem from '../PostItem'

export default function Dashboard(props){
    const {state, dispatch} = useContext(AppContext)
    const {name, server} = props.nameRes
    const {search} = state
    const [temp, setTemp] = useState(null)
    const [posts, setPosts] = useState(null)
    const [question, setQuestion] = useState(null)
    const token = `Bearer `+localStorage.getItem('token')
    const getPosts = async() =>{
        try {
            const option={
                method:'put',
                headers:{
                    Authorization: token
                },
                url: server+'/api/v1/posts/',
            }
            const res = await axios(option)
            setPosts(res.data.data.posts)
            setTemp(res.data.data.posts)
        } catch (error) {
            console.log(error)
        }
    }
    const getQuestion = async()=>{
        try{
            const option = {
                method: "get",
                headers:{
                    Authorization: token,
                },
                url: server+'/api/v1/page/'
            }
            const res = await axios(option)
            setQuestion(res.data.question)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getPosts()
        getQuestion()
    }, [])
    useEffect(()=>{
        if(posts){
            setPosts(temp.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).map(post => post))
        }
    }, [search])
    return(
        <Container sx={{py: 8}} maxWidth="md">
            <h1>Learning</h1>
            <Grid container spacing={4}>
                {posts && posts.map((post)=>(
                    <PostItem key={post._id} post={post} nameRes={props.nameRes} />
                ))}
            </Grid>
            <h1>Your Question</h1>
            <Grid container spacing={4}>
                {
                    question && question.map((ques)=>(
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography gutterBottom variant={"h5"} component={"div"}>
                                {ques.question}
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}