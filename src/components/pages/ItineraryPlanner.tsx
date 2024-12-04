import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

const ItineraryPlanner = () => {
  const [open, setOpen] = useState(false);
  
  // Mock data for activities
  const [activities] = useState<Activity[]>([
    {
      id: 1,
      title: 'City Tour',
      date: '2024-06-15',
      time: '09:00',
      location: 'City Center',
      category: 'Group Activity',
      description: 'Guided tour of the city\'s main attractions',
    },
    {
      id: 2,
      title: 'Group Dinner',
      date: '2024-06-15',
      time: '19:00',
      location: 'Local Restaurant',
      category: 'Meal',
      description: 'Traditional local cuisine experience',
    },
  ]);

  const categories = [
    'Group Activity',
    'Solo Activity',
    'Meal',
    'Transportation',
    'Accommodation',
    'Optional',
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupActivitiesByDate = (activities: Activity[]) => {
    const grouped = activities.reduce((acc: { [key: string]: Activity[] }, activity) => {
      if (!acc[activity.date]) {
        acc[activity.date] = [];
      }
      acc[activity.date].push(activity);
      return acc;
    }, {});

    // Sort activities by time within each date
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });

    return grouped;
  };

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trip Itinerary
        </Typography>

        {Object.entries(groupedActivities).map(([date, dayActivities]) => (
          <Paper key={date} sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {new Date(date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            <Grid container spacing={2}>
              {dayActivities.map((activity) => (
                <Grid item xs={12} key={activity.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{activity.title}</Typography>
                          <Typography color="text.secondary">
                            {activity.time} - {activity.location}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {activity.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'inline-block',
                              mt: 1,
                              backgroundColor: 'primary.main',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                            }}
                          >
                            {activity.category}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Activity Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            variant="outlined"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItineraryPlanner;
