import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {
  Box,
  CircularProgress,
} from '@mui/material';

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

interface ProfileMapProps {
  profiles: Profile[];
  height?: string;
  selectedProfileId?: string | null;
  onMarkerClick?: (profileId: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 20,
  lng: 0
};

const ProfileMap = ({ profiles, height = '70vh', selectedProfileId, onMarkerClick }: ProfileMapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<google.maps.Map | null>(null);
  const googleMarkers = useRef<google.maps.Marker[]>([]);

  // Replace with your Google Maps API key
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['marker'] // Specify libraries if needed
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    googleMarkers.current.forEach(marker => marker.setMap(null));
    googleMarkers.current = [];
    mapRef.current = null;
  };

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      googleMarkers.current.forEach(marker => marker.setMap(null));
      googleMarkers.current = [];

      const newMarkers = profiles.map(profile => {
        const marker = new google.maps.Marker({
          position: { lat: profile.coordinates.latitude, lng: profile.coordinates.longitude },
          map: mapRef.current,
        });

        marker.addListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(profile.id);
          }
        });
        return marker;
      });

      googleMarkers.current = newMarkers;
    }
  }, [profiles, isLoaded, onMarkerClick]);

  useEffect(() => {
    if (isLoaded && mapRef.current && selectedProfileId) {
      const selectedProfile = profiles.find(p => p.id === selectedProfileId);
      if (selectedProfile) {
        mapRef.current.panTo({ lat: selectedProfile.coordinates.latitude, lng: selectedProfile.coordinates.longitude });
      }
    }
  }, [selectedProfileId, profiles, isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Interactive Profile Map (Google Maps)</h2>
            <p className="text-gray-600">Explore all profiles on a world map. Click a marker for details.</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Map Section */}
            <div className="flex-1 p-6">

              <div
                className="w-full h-[60vh] lg:h-[70vh] rounded-xl shadow-lg overflow-hidden"
                style={{ minHeight: 350 }}
              >
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  >
                  </GoogleMap>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                  </Box>
                )}
              </div>
            </div>

            {/* Profile News Section */}
            <div className="w-full lg:w-96 bg-gray-50 p-6 border-l border-gray-200">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Recent Profiles</h3>
                  <div className="space-y-3">
                    {profiles.slice(0, 3).map((profile) => (
                      <button
                        key={profile.id}
                        className={`w-full bg-blue-50 rounded-lg shadow flex items-center gap-3 p-3 transition-all border-2 ${
                          selectedProfileId === profile.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'
                        } hover:border-blue-400 hover:shadow-lg focus:outline-none`}
                        onClick={() => onMarkerClick && onMarkerClick(profile.id)}
                      >
                        <img src={profile.photo} alt={profile.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-blue-900 text-base leading-tight">{profile.name}</div>
                          <div className="text-blue-700 text-xs">{profile.location}</div>
                          <div className="text-gray-500 text-xs truncate">{profile.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Popular Locations</h3>
                  <div className="space-y-3">
                    {profiles.slice(3, 6).map((profile) => (
                      <button
                        key={profile.id}
                        className={`w-full bg-blue-50 rounded-lg shadow flex items-center gap-3 p-3 transition-all border-2 ${
                          selectedProfileId === profile.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'
                        } hover:border-blue-400 hover:shadow-lg focus:outline-none`}
                        onClick={() => onMarkerClick && onMarkerClick(profile.id)}
                      >
                        <img src={profile.photo} alt={profile.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-blue-900 text-base leading-tight">{profile.name}</div>
                          <div className="text-blue-700 text-xs">{profile.location}</div>
                          <div className="text-gray-500 text-xs truncate">{profile.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMap; 