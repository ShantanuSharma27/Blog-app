import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

// Components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false); // For handling loading state
    const [error, setError] = useState(''); // For handling error messages

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                } else {
                    setError('Failed to fetch comments.');
                }
            } catch (err) {
                setError('An error occurred while fetching comments.');
            } finally {
                setLoading(false);
            }
        };
        if (post && post._id) {
            getData();
        }
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    };

    const addComment = async () => {
        if (comment.comments.trim() === '') {
            setError('Comment cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            const response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment(initialValue);
                setToggle(prev => !prev);
            } else {
                setError('Failed to add comment.');
            }
        } catch (err) {
            setError('An error occurred while adding comment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={addComment}
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Post'}
                </Button>             
            </Container>
            {error && <Typography color="error">{error}</Typography>}
            <Box>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                ) : (
                    !loading && <Typography>No comments yet.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Comments;
