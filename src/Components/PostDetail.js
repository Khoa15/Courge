import axios from 'axios'
import { useCallback, useEffect, useState, useContext } from 'react'
import AppContext from './AppContext'
import {useParams} from 'react-router-dom'
import {Container, Grid, Box, Divider, Typography, Card, CardContent, Button, List, ListItem, ListItemButton, ListItemText, Paper, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from '@mui/material'
export default function PostDetail(props)  {
    const {state, dispatch} = useContext(AppContext)
    const {user} = state
    const {server} = props.nameRes
    const [post, setPost] = useState(null)
    const [lesson, setLesson] = useState(null)
    const [isJoin, setIsJoin] = useState(0)
    const postId = window.location.pathname.split("/")[3];
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("token")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        const getPost = async()=>{
            const option = {
                method: 'get',
                url: server+'/api/v1/posts/'+postId
            }
            const res = await axios(option);
            setPost(res.data.post)
            if(user){
                setIsJoin(res.data.post.students.filter(student => student._id === user.id ) !== "")
            }
        }
        getPost()
    }, [user])
    const handleLesson = async (id) =>{
        if(isJoin && user.id){
            handleClickOpen()
        }
        try{
            const option={
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: server+'/api/v1/lessons/'+id
            }
            const res = await axios(option)
            if(res.data.success){
                setLesson(res.data.lesson)
            }
        }catch(error){
            console.log(error)
        }
        
    }
    const handleJoinCourse = async () => {
        try{
            const studentId = user.id
            const option = {
                method: 'post',
                url: server+'/api/v1/posts/'+postId+'/student',
                headers:{
                    Authorization: `Bearer ${token}`
                },
                data:{
                    students: studentId
                }
            }
            const res = await axios(option)
            console.log(res.data)
            if(res.data.success){
                setIsJoin(true)

            }
        }catch(error){
            console.log(error)
        }
    }
    let join = <Button fullWidth variant="outlined" onClick={handleJoinCourse}>Join now</Button>
    if(isJoin){
        join = <Button fullWidth variant="outlined" disabled>Learning</Button>
    }
    if(!user){
        join = <Button fullWidth variant="outlined" disabled>Please Sign In</Button>
    }
    return(
        (post && (<Container>
            <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                <Grid item xs={12} md={4} sm={3} mt={2}>
                    <Box>
                        <img src={post.image} loading='lazy' width="100%" height="340" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} sm={9} >
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </Grid>
                <Grid item xs={12}>
                    <Divider orientation="horizontal" variant="middle" />
                </Grid>
                <Grid item sm={9} xs={12}>
                    <List>
                        {post.lessons && post.lessons.map((lesson)=>(
                            <ListItemButton key={lesson._id} onClick={() => handleLesson(lesson._id)}>
                                <ListItem>
                                    <ListItemText>
                                        {lesson.title}
                                    </ListItemText>
                                </ListItem>

                            </ListItemButton>
                        ))}
                    </List>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        sx={{mt:2}}
                    >
                        <DialogTitle id="alert-dialog-title">
                            {lesson && lesson.title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {lesson && lesson.content}
                                
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid>
                <Divider orientation='vertical' variant="middle" flexItem/>
                <Grid item sm>
                    <Card variant="outlined" >
                        <CardContent>
                            {join}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>))
    )
}