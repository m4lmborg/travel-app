import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
  const features = [
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Group Coordination',
      description: 'Create and manage travel groups with ease. Share itineraries and stay connected.',
    },
    {
      icon: <MapIcon sx={{ fontSize: 40 }} />,
      title: 'Travel Planning',
      description: 'Plan your trips together. Create shared itineraries and manage group activities.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safety First',
      description: 'Keep emergency contacts and important information readily available.',
    },
  ];

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to LumiTrav
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your all-in-one platform for group travel coordination and safety
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/login"
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
              elevation={2}
            >
              {feature.icon}
              <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">{feature.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
