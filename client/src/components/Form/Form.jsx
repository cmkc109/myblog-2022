import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/posts'

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
   title: "", message: "", tags: "", selectedFile: "", updatedAt: new Date() 
  })
  const post = useSelector((state)=> currentId? state.posts.find((p) => p._id === currentId) : null)

  useEffect(()=> {
    if(post) setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '', updatedAt: ''});
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {...postData, updatedAt: new Date()}
    if(currentId) {
      dispatch(updatePost(currentId, newPost))
    } else {
      dispatch(createPost(newPost))
    }

    clear()
  };

  return (
     <Paper className={classes.paper}>
        <form noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit' : 'Create'} a Post</Typography>
        
        <TextField 
          name="title" variant="outlined" label="Title" 
          fullWidth value={postData.title} 
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        
        <TextField 
          name="message" variant="outlined" label="Message" fullWidth multiline 
          minRows={4} value={postData.message} 
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField 
          name="tags" variant="outlined" label="Tags (coma separated)" fullWidth 
          value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        
        <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} 
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>       
     </Paper>
  )
}

export default Form