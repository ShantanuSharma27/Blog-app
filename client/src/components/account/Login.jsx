import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background: #e55b1a;
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background: #f5f5f5;
        color: #0056b3;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [account, setAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount: setContextAccount } = useContext(DataContext);

    const imageURL = 'blog.png';

    useEffect(() => {
        setError('');
    }, [login, signup, account]);

    const handleInputChange = (e, type) => {
        if (type === 'login') {
            setLogin({ ...login, [e.target.name]: e.target.value });
        } else {
            setSignup({ ...signup, [e.target.name]: e.target.value });
        }
    };

    const loginUser = async () => {
        try {
            const response = await API.userLogin(login);
            if (response.isSuccess) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setContextAccount({ name: response.data.name, username: response.data.username });

                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong! Please try again later.');
        }
    };

    const signupUser = async () => {
        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setSignup(signupInitialValues);
                setAccount('login');
            } else {
                setError('Signup failed! Please try again later.');
            }
        } catch (error) {
            setError('Something went wrong! Please try again later.');
        }
    };

    const toggleSignup = () => {
        setAccount((prevAccount) => (prevAccount === 'signup' ? 'login' : 'signup'));
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField
                            variant="outlined"
                            value={login.username}
                            onChange={(e) => handleInputChange(e, 'login')}
                            name='username'
                            label='Enter Username'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            variant="outlined"
                            type='password'
                            value={login.password}
                            onChange={(e) => handleInputChange(e, 'login')}
                            name='password'
                            label='Enter Password'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={loginUser}>
                            Login
                        </LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name='name'
                            label='Enter Name'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name='username'
                            label='Enter Username'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name='password'
                            label='Enter Password'
                            type='password'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={signupUser}>
                            Signup
                        </SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={toggleSignup}>
                            Already have an account
                        </LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
