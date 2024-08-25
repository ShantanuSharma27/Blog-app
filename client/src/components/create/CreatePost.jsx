import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px auto',
    maxWidth: '800px',
    padding: '0 20px',
    [theme.breakpoints.down('md')]: {
        margin: '20px',
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

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
    margin-top: 20px;
    text-align: left;
    &:focus-visible {
        outline: none;
        border-color: #007bff;
    }
`;

const PublishButton = styled(Button)`
    font-size: 16px;
    font-weight: 600;
    background-color: #007bff;
    color: #fff;
    &:hover {
        background-color: #0056b3;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const { account } = useContext(DataContext);
    const defaultImageUrl = '/art.jpeg';
    const url = post.picture ? post.picture : defaultImageUrl;

    useEffect(() => {
        const uploadImage = async () => { 
            if (file) {
                try {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);
                    
                    const response = await API.uploadFile(data);
                    console.log('File upload response:', response.data);
        
                    if (response.isSuccess) {
                        // Extract the image URL from the response
                        const imageUrl = response.data.imageUrl;
                        setPost((prevPost) => ({
                            ...prevPost,
                            picture: imageUrl
                        }));
                    } else {
                        console.error('Error uploading file:', response.error);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
        
        uploadImage();
    }, [file]);

    useEffect(() => {
        if (account) {
            setPost((prevPost) => ({
                ...prevPost,
                categories: location.search?.split('=')[1] || 'All',
                username: account.username,
            }));
        }
    }, [location.search, account]);

    useEffect(() => {
        // Validate form fields
        const isValid = post.title && post.description && post.picture;
        setIsFormValid(isValid);
    }, [post]);

    const savePost = async () => {
        try {
            console.log('Saving post:', post);
            const response = await API.createPost(post);
            console.log('Create post response:', response);
    
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Error creating post:', response.error);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={url} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    onChange={handleChange}
                    name='title'
                    placeholder="Title"
                    value={post.title}
                />
                <PublishButton 
                    onClick={savePost} 
                    variant="contained" 
                    disabled={!isFormValid} // Disable button if form is not valid
                >
                    Publish
                </PublishButton>
            </StyledFormControl>
            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
                value={post.description}
            />
        </Container>
    );
};

export default CreatePost;
