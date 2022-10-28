import React from 'react';
import { useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import moment from 'moment';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
  
      <CardContent>
        <Typography className={classes.title} variant="h6"  component="h2" gutterBottom>{post.title}</Typography>
        <Typography variant="subtitle2" gutterBottom>{post.message}</Typography>
      </CardContent>
      
      <div className={classes.details}>
      <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
      <Typography variant="body2">Last updated: {moment(post.updatedAt).fromNow()}</Typography> 
      </div> 

      <CardActions className={classes.cardActions}>
        <Button size="small" onClick={ ()=> {dispatch(likePost(post._id))}}>
            <ThumbUpAltIcon fontSize="small"/>
            Like: 
            {post.likeCount}
        </Button>
        <Button size="small" onClick={ ()=> {setCurrentId(post._id)}}>
           <MoreHorizIcon />
           Edit
        </Button>
        <Button size="small" onClick={ ()=> {dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize="small"/>
            Delete
        </Button>
      </CardActions>

      

    </Card>
  )
}

export default Post