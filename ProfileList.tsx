import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Extend Profile type to include photo
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

const ProfileList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated API call with multiple profiles
    const mockProfiles: Profile[] = [
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
    ];
    setProfiles(mockProfiles);
    setLoading(false);
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
      {/* Left: Profile Cards */}
      <div className="flex-1 px-4 py-8 max-w-5xl mx-auto lg:mx-0">
        <input
          type="text"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Profiles"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search Profiles"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <button
              key={profile.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              tabIndex={0}
              aria-label={`Profile card for ${profile.name}`}
              onClick={() => openModal(profile)}
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 shadow"
              />
              <div className="flex-1 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h2>
                <p className="text-gray-500 mb-1">{profile.location}</p>
                <p className="text-gray-600 mb-4">{profile.description}</p>
              </div>
              <span className="sr-only">Open profile details</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Photo & Tagline */}
      <div className="hidden lg:flex flex-col items-center justify-center w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-300 p-8">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
          alt="Your Name"
          className="w-40 h-40 rounded-full object-cover border-4 border-white shadow mb-6"
        />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Your Name</h2>
        <p className="text-blue-800 text-center text-lg">Welcome to the Profile Mapper! Discover talented people from around the world, or add your own profile to the collection.</p>
      </div>

      {/* Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedProfile.photo}
              alt={selectedProfile.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 shadow"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProfile.name}</h2>
              <p className="text-gray-500 mb-1">{selectedProfile.location}</p>
              <p className="text-gray-600 mb-4">{selectedProfile.description}</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                onClick={() => {
                  closeModal();
                  navigate(`/profile/${selectedProfile.id}`);
                }}
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileList; 