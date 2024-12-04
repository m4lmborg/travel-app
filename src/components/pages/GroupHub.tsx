import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';

const GroupHub = () => {
  const [open, setOpen] = React.useState(false);

  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: 'Europe Summer Trip',
      members: 5,
      startDate: '2024-06-15',
      endDate: '2024-06-30',
    },
    {
      id: 2,
      name: 'Weekend Getaway',
      members: 3,
      startDate: '2024-03-22',
      endDate: '2024-03-24',
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Travel Groups
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <GroupsIcon sx={{ fontSize: 40, mr: 1 }} />
                    <Typography variant="h6" component="div">
                      {group.name}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    Members: {group.members}
                  </Typography>
                  <Typography color="text.secondary">
                    {new Date(group.startDate).toLocaleDateString()} -{' '}
                    {new Date(group.endDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                  <Button size="small">Manage Group</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Travel Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GroupHub;
