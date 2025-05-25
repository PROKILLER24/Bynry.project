import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import 'leaflet/dist/leaflet.css';
import { Profile } from '../types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 0,
  lng: 0
};

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your Google Maps API key
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProfile = async () => {
      try {
        // Simulated API call
        const mockProfile: Profile = {
          id: '1',
          name: 'John Doe',
          photo: 'https://via.placeholder.com/150',
          description: 'Software Engineer',
          location: 'New York, USA',
          coordinates: { latitude: 40.7128, longitude: -74.0060 },
        };
        setProfile(mockProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Profile not found
        </Typography>
      </Container>
    );
  }

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="stretch">
        {/* Profile Info Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 6 }}>
            <Box
              component="img"
              src={profile.photo}
              alt={profile.name}
              sx={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                objectFit: 'cover',
                mb: 3,
                alignSelf: 'center',
                boxShadow: 3,
                border: '4px solid #e3e8f0',
              }}
            />
            <Typography variant="h4" gutterBottom align="center">
              {profile.name}
            </Typography>
            <Typography variant="body1" paragraph align="center" sx={{ color: 'text.secondary', mb: 2 }}>
              {profile.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Typography variant="body2" paragraph>
                {profile.location}
              </Typography>
              <Typography variant="body2" paragraph>
                <b>Latitude:</b> {profile.coordinates.latitude}
              </Typography>
              <Typography variant="body2" paragraph>
                <b>Longitude:</b> {profile.coordinates.longitude}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 0, borderRadius: 4, height: '100%', minHeight: 450, overflow: 'hidden', boxShadow: 6, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, pb: 1 }}>
              <Typography variant="h6" gutterBottom>
                Map
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minHeight: 400, width: '100%' }}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{ lat: profile.coordinates.latitude, lng: profile.coordinates.longitude }}
                  zoom={13}
                >
                  <Marker position={{ lat: profile.coordinates.latitude, lng: profile.coordinates.longitude }} />
                </GoogleMap>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileDetail; 