import { useState, useEffect, ChangeEvent } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import type { Profile, ProfileFormData } from '../types';

const DEFAULT_PROFILE_PHOTO = 'https://randomuser.me/api/portraits/lego/1.jpg';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    location: '',
    description: '',
    photo: DEFAULT_PROFILE_PHOTO,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Mock data for testing
        const mockProfiles: Profile[] = [
          {
            id: '1',
            name: 'John Doe',
            location: 'New York',
            description: 'Software Engineer',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            coordinates: {
              latitude: 40.7128,
              longitude: -74.0060,
            },
          },
          {
            id: '2',
            name: 'Jane Smith',
            location: 'London',
            description: 'Product Designer',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            coordinates: {
              latitude: 51.5074,
              longitude: -0.1278,
            },
          },
          {
            id: '3',
            name: 'Carlos Ruiz',
            location: 'Madrid',
            description: 'Full-stack developer and open-source enthusiast.',
            photo: 'https://randomuser.me/api/portraits/men/65.jpg',
            coordinates: { latitude: 40.4168, longitude: -3.7038 },
          },
          {
            id: '4',
            name: 'Aisha Khan',
            location: 'Dubai',
            description: 'Mobile app developer with a passion for UX.',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            coordinates: { latitude: 25.2048, longitude: 55.2708 },
          },
          {
            id: '5',
            name: "Liam O'Connor",
            location: 'Dublin',
            description: 'Cloud architect and DevOps specialist.',
            photo: 'https://randomuser.me/api/portraits/men/23.jpg',
            coordinates: { latitude: 53.3498, longitude: -6.2603 },
          },
          {
            id: '6',
            name: 'Sofia Rossi',
            location: 'Rome',
            description: 'Front-end developer and CSS wizard.',
            photo: 'https://randomuser.me/api/portraits/women/12.jpg',
            coordinates: { latitude: 41.9028, longitude: 12.4964 },
          },
          {
            id: '7',
            name: 'Emily Chen',
            location: 'Singapore',
            description: 'Data scientist and AI researcher.',
            photo: 'https://randomuser.me/api/portraits/women/50.jpg',
            coordinates: { latitude: 1.3521, longitude: 103.8198 },
          },
          {
            id: '8',
            name: 'Mohammed Al-Farsi',
            location: 'Riyadh',
            description: 'Backend developer and API specialist.',
            photo: 'https://randomuser.me/api/portraits/men/70.jpg',
            coordinates: { latitude: 24.7136, longitude: 46.6753 },
          },
          {
            id: '9',
            name: 'Anna Müller',
            location: 'Berlin',
            description: 'UI/UX designer and accessibility advocate.',
            photo: 'https://randomuser.me/api/portraits/women/15.jpg',
            coordinates: { latitude: 52.52, longitude: 13.405 },
          },
          {
            id: '10',
            name: 'Lucas Silva',
            location: 'São Paulo',
            description: 'Mobile developer and Flutter expert.',
            photo: 'https://randomuser.me/api/portraits/men/41.jpg',
            coordinates: { latitude: -23.5505, longitude: -46.6333 },
          },
          {
            id: '11',
            name: 'Olga Petrova',
            location: 'Moscow',
            description: 'Cloud engineer and Kubernetes specialist.',
            photo: 'https://randomuser.me/api/portraits/women/25.jpg',
            coordinates: { latitude: 55.7558, longitude: 37.6173 },
          },
          {
            id: '12',
            name: 'David Kim',
            location: 'Seoul',
            description: 'Full-stack developer and mentor.',
            photo: 'https://randomuser.me/api/portraits/men/12.jpg',
            coordinates: { latitude: 37.5665, longitude: 126.978 },
          },
        ];
        setProfiles(mockProfiles);
        setLoading(false);
      } catch (error) {
        setError('Failed to load profiles');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (isNaN(formData.coordinates.latitude) || isNaN(formData.coordinates.longitude)) {
      setError('Valid coordinates are required');
      return false;
    }
    return true;
  };

  const handleOpenDialog = (profile?: Profile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData({
        name: profile.name,
        location: profile.location,
        description: profile.description,
        photo: profile.photo,
        coordinates: {
          latitude: profile.coordinates.latitude,
          longitude: profile.coordinates.longitude,
        },
      });
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        location: '',
        description: '',
        photo: DEFAULT_PROFILE_PHOTO,
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingProfile(null);
    setError(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'latitude' || name === 'longitude') {
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: parseFloat(value) || 0,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
      if (editingProfile) {
        // Update existing profile
        setProfiles((prev) =>
          prev.map((p) =>
            p.id === editingProfile.id
              ? { ...p, ...formData }
              : p
          )
        );
        setSuccess('Profile updated successfully');
      } else {
        // Add new profile
        const newProfile: Profile = {
          id: Date.now().toString(),
          ...formData,
        };
        setProfiles((prev) => [...prev, newProfile]);
        setSuccess('Profile added successfully');
      }
      handleCloseDialog();
    } catch (error) {
      setError('Failed to save profile');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        setProfiles((prev) => prev.filter((p) => p.id !== id));
        setSuccess('Profile deleted successfully');
      } catch (error) {
        setError('Failed to delete profile');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" color="primary">
          Admin Panel
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Profile
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {profiles.map((profile) => (
          <Paper
            key={profile.id}
            elevation={2}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <Box
              component="img"
              src={profile.photo}
              alt={profile.name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                mb: 2,
                border: '4px solid',
                borderColor: 'primary.light',
              }}
            />
            <Typography variant="h6" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {profile.location}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
              {profile.description}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
              <Tooltip title="Edit Profile">
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(profile)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Profile">
                <IconButton
                  color="error"
                  onClick={() => handleDelete(profile.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}
      </Box>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProfile ? 'Edit Profile' : 'Add New Profile'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={formData.photo}
                alt="Profile"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid',
                  borderColor: 'primary.light',
                }}
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCameraIcon />}
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>
            </Box>

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.coordinates.latitude}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.coordinates.longitude}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingProfile ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPanel; 