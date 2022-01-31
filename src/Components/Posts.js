import * as React from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import {Container, Grid} from '@mui/material'
import PostItem from './PostItem'
function Posts(props){
    const {state, dispatch} = React.useContext(AppContext)
    const {posts, user, search} = state
    const getAllPosts = React.useCallback(async()=>{
        try {
            const option ={
                method: 'get',
                url: '/api/v1/posts',
            }
            const response = await axios(option);
            dispatch({type: "GET_ALL_POSTS", payload: response.data.posts})
        } catch (error) {
            console.log(error)
        }
    }, [])

    React.useEffect(()=>{
        getAllPosts()
    }, [])
    const newPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).map(post => post)
    return(
        <Container sx={{py: 8}} maxWidth="md">
            <Grid container spacing={4}>
                {newPosts.map((post) => (
                    <PostItem key={post._id} post={post} nameRes={props.nameRes} /> 
                ))
                }
            </Grid>
        </Container>
    )
}

export default Posts;