import React, { useCallback, useEffect, useState } from "react"
import {Container, Grid, Alert, Button, Fab, Dialog, DialogTitle,IconButton, DialogActions,DialogContent,DialogContentText, Box, TextField, FormGroup, FormControlLabel, Checkbox, Tooltip, Divider, List, ListItem} from '@mui/material'
import {DataGrid, GridRowsProp, GridColDef, GridCellEditCommitParams} from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios'
export default function Courses(props){
    const nameRes = props.nameRes
    const [courses, setCourses] = useState(null)
    const [courseInput, setCourseInput] = useState({})
    const [lessonInput, setLessonInput] = useState([])
    const [courseChange, setCourseChange] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [open, setOpen] = useState(false)
    const token = `Bearer ` + localStorage.getItem('token')
    const [viewCourse, setViewCourse] = useState(null)
    const handleEditCommit = (e) =>{
        setCourseChange(e)
        const newArray = courses.map(r => {
            if(r._id === e.id){
                return {...r, [e.field]:e.value}
            }else{
                return {...r}
            }
        })
        setCourses(newArray)
    }
    const saveCourse = async()=>{
        try {
            const option = {
                method:'put',
                url: nameRes.server+'/api/v1/posts/'+courseChange.id,
                headers:{
                    Authorization: token
                },
                data: {
                    [courseChange.field]:courseChange.value
                }
            }
            const res = await axios(option)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(courseChange!==null) saveCourse()
    }, [courseChange])
    const handleClickAddCourse = () =>{
        setCourseInput({image: 'https://source.unsplash.com/random', lessons:[]})
        setEditMode(false)
        handleClickOpen()
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setLessonInput([])
        setOpen(false);
    };
    const handleChangeInput = (e)=>{
        setCourseInput({...courseInput, [e.target.name]:e.target.value})
    }
    const handleChangeInputLesson = (id, e, i)=>{
        let lesson = [...courseInput.lessons]
        lesson[i] = {...lesson[i], [e.target.name]:e.target.value}
        const newValue = {...courseInput, lessons:lesson}
        setCourseInput(newValue)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        handleClose()
        if(editMode){
            try {
                if(lessonInput){
                    lessonInput.map((lesson)=>{
                        let option = {
                            method:'DELETE',
                            url:nameRes.server+'/api/v1/lessons/'+lesson,
                            headers:{
                                Authorization: token
                            }
                        }
                        courseInput.lessons.map((lesson)=>{//update lesson
                            let option2 = {
                                method: 'post',
                                url: nameRes.server+'/api/v1/lessons/'+lesson._id,
                                headers:{
                                    Authorization: token
                                },data:{
                                    title: lesson.title,
                                    content: lesson.content,
                                    video: lesson.video
                                }
                            }
                            if(lesson.isAdd){
                                option2.method = 'post'
                                option2.url = nameRes.server+'/api/v1/lessons'
                            }
                            axios(option2).then((rel)=>{
                                if(lesson.isAdd){
                                    option2.url = nameRes.server+'/api/v1/posts/'+courseInput._id
                                    option2.data = {lessons: rel.data.lesson._id}
                                    axios(option2).then((result)=>{
                                        console.log(result, 'hi')
                                    })
                                    lesson.isAdd = false
                                }
                            })
                        })
                        axios(option).then((res)=>{
                            option.url = nameRes.server+'/api/v1/posts/'+courseInput._id+'/lesson'
                            option.data = {lessons: lesson}
                            axios(option).then((rel)=>{
                                console.log(rel.data)
                            })
                        })
                    })
                }
                const option = {
                    method: 'put',
                    headers:{
                        Authorization: token
                    },
                    url: nameRes.server+'/api/v1/posts/'+courseInput._id,
                    data: {
                        title: courseInput.title,
                        content: courseInput.content,
                        image: courseInput.image,
                    }
                }
                const res = await axios(option)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const option = {
                    method: 'post',
                    url:nameRes.server+'/api/v1/posts/',
                    headers:{
                        Authorization: token
                    },
                    data:{
                        title: courseInput.title,
                        content: courseInput.content,
                        image: courseInput.image
                    }
                }
                const res = await axios(option)
                if(res){
                    const postId = res.data.post._id
                    if(courseInput.lessons.length > 0){
                        courseInput.lessons.map((lesson)=>{//update lesson
                            let option2 = {
                                method: 'post',
                                url: '/api/v1/lessons/',
                                headers:{
                                    Authorization: token
                                },data:{
                                    title: lesson.title,
                                    content: lesson.content,
                                    video: lesson.video
                                }
                            }
                            axios(option2).then((rel)=>{
                                option2.url = '/api/v1/posts/'+postId
                                option2.data = {lessons: rel.data.lesson._id}
                                axios(option2).then((result)=>{
                                    getAllPosts();
                                })
                            })
                        })
                    }else{
                        getAllPosts();
                    }
                }
                setCourses([...courses, res.data.post])
                } catch (error) {
                    console.log(error)
                }
            }

        }
    const getAllPosts = useCallback(async()=>{
        try {
            const option = {
                method: 'get',
                url:nameRes.server+'/api/v1/posts',
                headers:{
                    Authorization: token
                }
            }
            const res = await axios(option)
            setCourses(res.data.posts)
        } catch (error) {
            console.log(error)
        }
    })
    useEffect(()=>{
        getAllPosts()
    }, [])
    const handleDeleteLesson = (e) =>{
        const newArr = {...courseInput, lessons:courseInput.lessons.filter(x => x._id !== e)}
        setCourseInput(newArr)
        setLessonInput([...lessonInput,e])
    }
        console.log(lessonInput)
    const handleAddLesson = (e) =>{
        const newLesson = {_id: new Date().getTime(), title:"", content:"", video:"", isAdd:true}
        const newArr = {...courseInput, lessons:[... courseInput.lessons, newLesson]}
        setCourseInput(newArr)
    }
    const handleEditEvent = (e) =>{
        setEditMode(true)
        setCourseInput(courses.filter(r=>{
            if(r._id === e.id){
                return r
            }
        })[0])
        
        handleClickOpen()
    }
    const handleDeleteCourse = async(e)=>{
        if(window.confirm("Are you sure?")===true){
            try {
                const option = {
                    method: 'delete',
                    url:nameRes.server+'/api/v1/posts/'+e.id,
                    headers:{
                        Authorization: token
                    }
                }
                axios(option).then((res)=>{
                    e.row.lessons.map((lesson)=>{
                        axios({
                            method:'delete',
                            url:nameRes.server+'/api/v1/lessons/'+lesson._id,
                            headers:{
                                Authorization: token
                            }
                        }).then((result)=>{
                            console.log(result)
                        })
                    })
                })
                setCourses(courses.filter(r=>r._id!==e.id))
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleViewCourse = async(e)=>{
        try {
            const option = {
                method: 'get',
                url:nameRes.server+'/api/v1/posts/'+e.id,
                headers:{
                    Authorization: token
                }
            }
            const res = await axios(option)
            setViewCourse(res.data.post)
            handleClickOpen()
        } catch (error) {
            console.log(error)
        }
    }
    const columns = [
        {field: 'title', headerName: 'Title', editable: true},
        {field: 'content', headerName:'Content', width: 200, editable: true},
        {field: 'author', headerName:'Author',valueGetter:(params)=>{return (params.row.author.name)}, width: 100, editable: false},
        {field: 'image', headerName:'Image', renderCell:(params)=>{return (<img lazy="true" src={params.value} width="100%"/>)}, editable: true},
        {field: 'createdAt', headerName:'Created At', width: 150, renderCell:(params)=>{return params.value}},
        {field: '', renderCell:(c)=>{return (
        <>
            <IconButton onClick={()=>handleEditEvent(c)}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={()=>handleDeleteCourse(c)}>
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={()=>handleViewCourse(c)}>
                <InfoIcon />
            </IconButton>
        </>)}, width: 130},
        
    ]
    return(
        <>
        <Grid item sm={9} xs={12}>
            <Button onClick={handleClickAddCourse}>Add Course</Button>
            {courses && (<DataGrid initialState={{sorting:{sortModel:[{field:'createdAt', sort:'desc'}]}}} sx={{minHeight: 300}} autoHeight getRowId={(row) => row._id} columns={columns} rows={courses} columnBuffer={3} rowsPerPageOptions={[10]} pageSize={10} onCellEditCommit={handleEditCommit} />)}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {!viewCourse && (<DialogContent>
                    <DialogContentText>
                        <Box onSubmit={handleSubmit} component="form">
                            <>
                            <TextField
                                autoFocus
                                margin="normal"
                                fullWidth
                                required
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete='off'
                                onChange={handleChangeInput}
                                defaultValue={courseInput.title}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                id="content"
                                label="Content"
                                name="content"
                                multiline
                                onChange={handleChangeInput}
                                minRows={2}
                                maxRows={10}
                                defaultValue={courseInput.content}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                id="image"
                                label="Image"
                                name="image"
                                defaultValue={courseInput.image}
                                onChange={handleChangeInput}
                            />
                            </>
                            
                            {courseInput.lessons && courseInput.lessons.map((lesson, i)=>(
                                <React.Fragment key={lesson._id}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        id="title"
                                        label="Lesson Title"
                                        name="title"
                                        defaultValue={lesson.title}
                                        onChange={(e)=>handleChangeInputLesson(lesson._id, e, i)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        id="content"
                                        label="Lesson content"
                                        name="content"
                                        defaultValue={lesson.content}
                                        onChange={(e)=>handleChangeInputLesson(lesson._id, e, i)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        id="video"
                                        label="Lesson video"
                                        name="video"
                                        defaultValue={lesson.video}
                                        onChange={(e)=>handleChangeInputLesson(lesson._id, e, i)}
                                    />
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <IconButton onClick={()=>handleDeleteLesson(lesson._id)}><DeleteIcon/></IconButton>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Tooltip title="Khóa học sẽ được đăng công khai, bỏ tick nếu muốn ẩn" placement="top">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Công khai" name="isPublic" onChange={handleChangeInput} />
                                        </FormGroup>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleAddLesson}>add lesson</Button>
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained">Save</Button>
                        </Box>
                    </DialogContentText>
                </DialogContent>)}
                {viewCourse && (<DialogContent>
                    <DialogContentText>
                                <h2>{viewCourse.title}</h2>
                        <Grid container spacing={4}>
                            <Grid item md={3} xs={12}>
                                <img src={viewCourse.image} width="100%" />
                            </Grid>
                            <Grid item md={9} xs={12}>
                                <p>{viewCourse.content}</p>
                            </Grid>
                            <Grid item md={12}>
                                <Divider />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <p>Author name:{viewCourse.author.name}</p>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <h4>Students</h4>
                                <List sx={{maxHeight: 300}}>
                                    {viewCourse.students && viewCourse.students.map((student)=>(
                                        <ListItem key={student.id}>{student.name}</ListItem>

                                    ))}
                                </List>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <h4>Lessons</h4>
                                <List sx={{maxHeight: 300}}>
                                    {viewCourse.lessons && viewCourse.lessons.map((lesson)=>(
                                        <ListItem key={lesson.id}>{lesson.title}</ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                        
                    </DialogContentText>
                </DialogContent>)}
            </Dialog>
        </Grid>
        {/* <Grid item sm={12}>
        <Alert severity="info" style={{ marginBottom: 8 }}>
            <code>editRowsModel: {JSON.stringify(users)}</code>
        </Alert>
        </Grid> */}
        </>
    )
}