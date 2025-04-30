import { useState, useEffect } from "react";

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);


const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12" y2="18"></line>
    <path d="M9 6h6v4H9z"></path>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export default function Appr() {
  // Initialize darkMode from localStorage (if available)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchQuery(username.trim());
    }
  };

  // Fetch user data when search query changes
  useEffect(() => {
    if (!searchQuery) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Encode the username to handle spaces properly
        const encodedUsername = encodeURIComponent(searchQuery);
        const response = await fetch(`https://api.github.com/users/${encodedUsername}`);
        
        if (!response.ok) {
          throw new Error("User not found");
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        // Do not clear previous user data when there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [searchQuery]);

  // Format date to "Joined [day] [month] [year]" format
  const formatJoinDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return `Joined ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  // Apply dark mode effect to document body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-6 sm:py-10 max-w-3xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            devfinder
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-2 uppercase text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-500'}`}
          >
            {darkMode ? (
              <>
                LIGHT
                <SunIcon />
              </>
            ) : (
              <>
                DARK
                <MoonIcon />
              </>
            )}
          </button>
        </header>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className={`flex items-center rounded-lg shadow-md mb-4 sm:mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="pl-2 sm:pl-4 text-blue-500">
            <SearchIcon />
          </div>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 sm:p-4 text-sm sm:text-base bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'}`}
            />
          </div>
          <div className="flex items-center">
            {error && <span className="text-red-500 mr-2 text-xs sm:text-sm whitespace-nowrap">No results</span>}
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg m-1 sm:m-2 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Card */}
        {loading ? (
          <div className={`rounded-lg p-4 sm:p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </div>
        ) : userData ? (
          <div className={`rounded-lg p-4 sm:p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="sm:flex gap-4 md:gap-8">
              {/* Avatar (larger on desktop) */}
              <div className="sm:w-1/5 md:w-1/4 mb-4 sm:mb-0 flex justify-center sm:justify-start">
                <img
                  src={userData.avatar_url}
                  alt={`${userData.login}'s avatar`}
                  className="w-20 h-20 sm:w-40 sm:h-40 rounded-full"
                />
              </div>

              {/* User Info */}
              <div className="sm:w-4/5 md:w-3/4">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{userData.name || userData.login}</h2>
                    <a
                      href={`https://github.com/${userData.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm sm:text-base"
                    >
                      @{userData.login}
                    </a>
                  </div>
                  <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                    {formatJoinDate(userData.created_at)}
                  </div>
                </div>

                {/* Bio */}
                <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${userData.bio ? '' : 'opacity-70'}`}>
                  {userData.bio || "This profile has no bio"}
                </p>

                {/* Stats */}
                <div className={`grid grid-cols-3 gap-2 sm:gap-4 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center sm:text-left ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-500">Repos</h3>
                    <p className="font-bold text-base sm:text-lg">{userData.public_repos}</p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-500">Followers</h3>
                    <p className="font-bold text-base sm:text-lg">{userData.followers}</p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-500">Following</h3>
                    <p className="font-bold text-base sm:text-lg">{userData.following}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className={`flex items-center gap-2 ${userData.location ? '' : 'opacity-50'}`}>
                    <LocationIcon />
                    <span className="truncate">{userData.location || "Not Available"}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${userData.twitter_username ? '' : 'opacity-50'}`}>
                    <TwitterIcon />
                    <span className="truncate">{userData.twitter_username || "Not Available"}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${userData.blog ? '' : 'opacity-50'}`}>
                    <LinkIcon />
                    {userData.blog ? (
                      <a
                        href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:underline"
                      >
                        {userData.blog}
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </div>
                  <div className={`flex items-center gap-2 ${userData.company ? '' : 'opacity-50'}`}>
                    <BuildingIcon />
                    <span className="truncate">{userData.company || "Not Available"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}