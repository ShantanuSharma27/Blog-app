import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url('/contact.jpeg'); /* Ensure the URL is correct */
    width: 100%;
    height: 60vh; /* Adjust height if needed */
    background-position: center; /* Center the image */
    background-size: cover; /* Cover the area but maintain aspect ratio */
    background-repeat: no-repeat; /* Avoid repeating the image */
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #4a4a4a; /* Adjusted color for better readability */
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
`;

const Heading = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: #333;
`;

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Heading variant="h3">Getting in Touch is Easy!</Heading>    
                <Text variant="h5">
                    Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/laukik-vashistha-024571222/" color="inherit" target="_blank">
                            <LinkedIn/>
                        </Link>
                    </Box>
                    or send me an Email 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="mailto:laukik283202@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>
                    </Box>.
                    or Call on +91 7505980644
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
