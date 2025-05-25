import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import ProfileList from './pages/ProfileList';
import ProfileDetail from './pages/ProfileDetail';
import AdminPanel from './pages/AdminPanel';
import ProfileMap from './pages/ProfileMap';
import { useState, createContext } from 'react';

// Profile type (sync with ProfileList)
export interface Profile {
  id: string;
  name: string;
  location: string;
  description: string;
  photo: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const ProfilesContext = createContext<Profile[]>([]);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // Centralize profiles state for sharing
  const [profiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'John Doe',
      location: 'New York',
      description: 'Software Engineer passionate about building scalable web applications.',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
    },
    {
      id: '2',
      name: 'Jane Smith',
      location: 'London',
      description: 'Product Designer who loves minimalism and user-centric design.',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      coordinates: { latitude: 51.5074, longitude: -0.1278 },
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
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfilesContext.Provider value={profiles}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/map" element={<ProfileMap profiles={profiles} height="80vh" />} />
          </Routes>
        </Router>
      </ProfilesContext.Provider>
    </ThemeProvider>
  );
}

export default App;
