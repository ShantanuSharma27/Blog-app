import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link, useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%);
    color: black;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Container = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled('img')`
    height: 40px;
    margin-right: auto;
`;

const LinksContainer = styled('div')`
    display: flex;
    align-items: center;
    & > a {
        padding: 15px 25px;
        color: #333;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        transition: color 0.3s, transform 0.3s;
        border-radius: 4px;
    }
    & > a:hover {
        color: #007bff;
        background-color: rgba(0, 123, 255, 0.1);
        transform: scale(1.05);
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                <Logo src='blog.png' alt='Blog Logo' />
                <LinksContainer>
                    <Link to='/'>HOME</Link>
                    <Link to='/about'>ABOUT</Link>
                    <Link to='/contact'>CONTACT</Link>
                    <Link to='/account' onClick={logout}>LOGOUT</Link>
                </LinksContainer>
            </Container>
        </Component>
    )
}

export default Header;
