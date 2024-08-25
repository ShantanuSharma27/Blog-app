import { Box, styled, Typography, Link, List, ListItem } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url('/about.png'); /* Correct path for public folder */
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align content to the left */
    text-align: left; /* Align text to the left */
    max-width: 800px; /* Optional: limit the maximum width */
    margin: 0 auto; /* Center the wrapper horizontally */
`;

const Text = styled(Typography)`
    color: #4a4a4a;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 20px;
`;

const Heading = styled(Typography)`
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: #333;
    margin-bottom: 30px;
`;

const ListItemStyled = styled(ListItem)`
    display: flex;
    align-items: center;
    padding: 0;
`;

const About = () => {
    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Heading variant="h3">About Me</Heading>
                <Text variant="h5">
                    I'm Laukik Vashistha, a MERN stack developer based in India. 
                    I have hands-on experience on various projects, with a major one being StudyNotion, an edtech platform.
                </Text>
                <List>
                    <ListItemStyled>
                        <Text variant="h6">• Hands-on experience with various projects, including:</Text>
                    </ListItemStyled>
                    <ListItemStyled>
                        <Text variant="h6">• StudyNotion, an edtech platform</Text>
                    </ListItemStyled>
                    <ListItemStyled>
                        <Text variant="h6">• Other notable projects</Text>
                    </ListItemStyled>
                </List>
                <Text variant="h5">
                    If you are interested in my work, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Laukik-Vashistha" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have a chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/laukik-vashistha-024571222/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>  
                    or send me an Email 
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="mailto:laukik283202@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>
                    </Box>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default About;
