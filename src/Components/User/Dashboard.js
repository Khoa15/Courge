import { Container, Grid } from '@mui/material'
import axios from 'axios'
import {useEffect, useCallback, useContext, useState} from 'react'
import AppContext from '../AppContext'
import PostItem from '../PostItem'

export default function Dashboard(){
    const {state, dispatch} = useContext(AppContext)
    const {search} = state
    const [temp, setTemp] = useState(null)
    const [posts, setPosts] = useState(null)
    const token = `Bearer `+localStorage.getItem('token')
    const getPosts = async() =>{
        try {
            const option={
                method:'put',
                headers:{
                    Authorization: token
                },
                url: '/api/v1/posts/',
            }
            const res = await axios(option)
            setPosts(res.data.data.posts)
            setTemp(res.data.data.posts)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getPosts()
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
                    <PostItem key={post._id} post={post} />
                ))}
            </Grid>
        </Container>
    )
}