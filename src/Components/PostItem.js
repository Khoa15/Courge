import React from 'react'
import {Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Link, Box} from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
export default function PostItem(props){
    const post = props.post
    return(
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ flexDirection:'column', display: 'flex', height:"340px" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={post.image}
                />
                <CardContent>
                    <Typography gutterBottom variant={"h5"} component={"div"}>
                    {post.title}
                    </Typography>
                    <Typography variant={"body2"} color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow:'hidden', width: '100%', height: '70px' }}>
                            {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`/post/${post._id}`} color="inherit" underline="none"><Button variant="outlined" endIcon={<ReadMoreIcon />}>More</Button></Link>
                </CardActions>
            </Card>
        </Grid>
    )
}