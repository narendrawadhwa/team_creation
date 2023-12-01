import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userActions';

const ProfileDisplay = () => {
  const dispatch = useDispatch();
  const { users, currentPage, totalPages, loading, error } = useSelector((state) => state) || {};

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch users when the component mounts
    handleSearch();
  }, [currentPage, dispatch]);

  const handleSearch = async () => {
    // If there's no search term, fetch all users
    const searchFilters = searchTerm ? { search: searchTerm } : {};
    await dispatch(getUsers(currentPage, searchFilters));
  };

  return (
    <div>
      {/* Display search bar here */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
        placeholder="Search..."
      />

      {/* Display your user profiles here */}
      {loading && <div>Loading...</div>}

      {error && <div>Error: {error.message}</div>}

      {users && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user._id}>
              <h2>{`${user.first_name} ${user.last_name}`}</h2>
              <p>Email: {user.email}</p>
              <p>Availability: {user.available ? 'Available' : 'Not Available'}</p>
              {/* Add other user details you want to display */}
            </div>
          ))}

          {/* Pagination buttons */}
          <div>
            <button onClick={() => dispatch(getUsers(currentPage - 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => dispatch(getUsers(currentPage + 1))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}

      {users && users.length === 0 && <div>No search results found</div>}
    </div>
  );
};

export default ProfileDisplay;



