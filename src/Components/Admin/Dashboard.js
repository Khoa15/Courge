import {useEffect, useState} from 'react'
import { Container, Grid, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import axios from 'axios';

export default function Dashboard(){
  const [countCourses, setCountCourses] = useState(0)
  const [countUsers, setCountUsers] = useState(0)
  const [countLessons, setCountLessons] = useState(0)
  const token = 'Bearer ' + localStorage.getItem('token')
  const getCountData = async()=>{
    try {
      const option = {
        method: 'get',
        url: '/api/v1/analysis/data',
        headers:{
          Authorization: token
        }
      }  
      const res = await axios(option)
      setCountCourses(res.data.posts)
      setCountUsers(res.data.users)
      setCountLessons(res.data.lessons)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getCountData()
  }, [])
    return(
        <Grid item sm={9} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Tổng số khóa học</Typography>
                  <Typography variant="h5">{countCourses}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Tổng số người dùng</Typography>
                  <Typography variant="h5">{countUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">Tổng số bài học</Typography>
                  <Typography variant="h5">{countLessons}</Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
    )
}