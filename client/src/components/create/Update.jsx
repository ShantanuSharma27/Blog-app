import React, { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 20px;
    font-size: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    &:focus {
        border-color: #007bff;
    }
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
    margin-top: 20px;
    &:focus-visible {
        outline: none;
        border-color: #007bff;
    }
`;

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState({
        title: '',
        description: '',
        picture: '',
        username: 'codeforinterview',
        categories: 'Tech',
        createdDate: new Date()
    });
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    setError('Error fetching post.');
                }
            } catch (err) {
                setError('Error fetching post.');
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => { 
            if (file) {
                setLoading(true);
                setError(null);
                try {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);
                    
                    const response = await API.uploadFile(data);
                    if (response.isSuccess) {
                        setPost((prevPost) => ({ ...prevPost, picture: response.data.imageUrl }));
                        setImageURL(response.data.imageUrl);    
                    } else {
                        throw new Error(response.error || 'Error uploading file');
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        getImage();
    }, [file]);

    const updateBlogPost = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.updatePost(post);
            if (response.isSuccess) {
                navigate(`/details/${id}`);
            } else {
                throw new Error(response.error || 'Error updating post');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                    aria-label="Upload file"
                />
                <InputTextField 
                    onChange={handleChange} 
                    value={post.title} 
                    name='title' 
                    placeholder="Title" 
                />
                <Button 
                    onClick={updateBlogPost} 
                    variant="contained" 
                    color="primary"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </StyledFormControl>

            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange} 
                value={post.description}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    );
};

export default Update;
