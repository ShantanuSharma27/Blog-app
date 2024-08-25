import { styled, Box, Typography, Button } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url('/banner.jpeg') center/cover no-repeat; /* Ensure the image path is correct */
    height: 60vh; /* Increased height for more impact */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    color: #FFFFFF;
    overflow: hidden; /* Prevents overflow of child elements */
    /* Optional: Add a gradient overlay for better text contrast */
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4); /* Dark overlay for better readability */
        z-index: 1;
    }
`;

const Heading = styled(Typography)`
    font-size: 70px; /* Adjusted font size */
    color: #FFFFFF;
    line-height: 1.2;
    font-weight: bold; /* Bold text for emphasis */
    z-index: 2; /* Ensure it appears above the overlay */
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6); /* Enhanced shadow for better readability */
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.6); /* Semi-transparent background for readability */
    padding: 5px 10px;
    border-radius: 8px;
    margin-top: 20px;
    z-index: 2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* Light shadow for text */
`;

const ExploreButton = styled(Button)`
    margin-top: 20px;
    padding: 10px 20px;
    background: #FF5722; /* Vibrant button color */
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
    &:hover {
        background: #E64A19; /* Darker shade on hover */
    }
`;

const Banner = () => {
    return (
        <Image>
            <Heading>Manage Your Blog</Heading>
            <SubHeading>Create, Update, Delete, and Categorize</SubHeading>
            <ExploreButton variant="contained">Get Started</ExploreButton>
        </Image>
    );
}

export default Banner;
