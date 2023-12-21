import { Typography, Grid, Card, CardContent, Container, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));
const Benefit = () => {

    const userTypes = [
        {
            title: 'Developers',
            description: 'Organize projects, track tasks, and collaborate effectively with team members.',
        },
        {
            title: 'Corporate Professionals',
            description: 'Streamline workflow, manage deadlines, and enhance team productivity.',
        },
        {
            title: 'Bankers',
            description: 'Coordinate tasks, manage client interactions, and track financial objectives efficiently.',
        },
        // Add more user types as needed
    ];
    return (

        <Container maxWidth="lg">
            <h1 className="text-4xl font-semibold text-state-950 text-center mt-9">Who Can Benefit?</h1>
            <Grid my={3} container spacing={3}>
                {userTypes.map((user, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {user.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {user.description}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
};

export default Benefit;