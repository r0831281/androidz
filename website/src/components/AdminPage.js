import React, { useState, useEffect } from 'react';
import { makeShow, makeSong, fetchShows, fetchSongs, deleteShow, deleteSong, updateShow, updateSong } from '../services/showService';
import Login from './Login';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [shows, setShows] = useState([]);
  const [songs, setSongs] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const [editType, setEditType] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const getInitialData = async () => {
        const fetchedShows = await fetchShows();
        const fetchedSongs = await fetchSongs();
        setShows(fetchedShows);
        setSongs(fetchedSongs);
      };
      getInitialData();
    }
  }, [isLoggedIn, dataChanged]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleDeleteShow = async (id) => {
    await deleteShow(id);
    setDataChanged(!dataChanged);
  };

  const handleDeleteSong = async (id) => {
    await deleteSong(id);
    setDataChanged(!dataChanged);
  };

  const handleCreateShow = async (event) => {
    event.preventDefault();
    await makeShow(event);
    setDataChanged(!dataChanged);
  };

  const handleCreateSong = async (event) => {
    event.preventDefault();
    await makeSong(event);
    setDataChanged(!dataChanged);
  };

  const handleEditShow = (show) => {
    setCurrentEditData(show);
    setEditType('show');
    setIsModalOpen(true);
  };

  const handleEditSong = (song) => {
    setCurrentEditData(song);
    setEditType('song');
    setIsModalOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (editType === 'show') {
      await updateShow(currentEditData.id, currentEditData);
    } else if (editType === 'song') {
      await updateSong(currentEditData.id, currentEditData);
    }
    setIsModalOpen(false);
    setDataChanged(!dataChanged);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditData({ ...currentEditData, [name]: value });
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">Admin Page</h2>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>
          <p>This is content that only authorized admins can access.</p>
          <div className="mb-4">
            <h2>Create Show</h2>
            <form onSubmit={handleCreateShow} className="form-inline">
              <input type="text" placeholder="Show Venue" name="showVenue" required className="form-control mr-2 mb-2" />
              <input type="text" placeholder="Show Date" name="showDate" required className="form-control mr-2 mb-2" />
              <input type="text" placeholder="Show Tickets" name="showTickets" className="form-control mr-2 mb-2" />
              <button type="submit" className="btn btn-primary mb-2">Create Show</button>
            </form>
          </div>
          <div className="mb-4">
            <h2>Create Songs</h2>
            <form onSubmit={handleCreateSong} className="form-inline">
              <input type="text" placeholder="Song Title" name="songTitle" required className="form-control mr-2 mb-2" />
              <input type="text" placeholder="Song Link" name="songLink" required className="form-control mr-2 mb-2" />
              <button type="submit" className="btn btn-primary mb-2">Create Song</button>
            </form>
          </div>
          <div className="mb-4">
            <h2>Existing Shows</h2>
            <table className="table table-striped table-bordered text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Tickets/video</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map(show => (
                  <tr key={show.id}>
                    <td>{show.venue}</td>
                    <td>{show.date}</td>
                    <td>{show.tickets}</td>
                    <td>
                      <button onClick={() => handleDeleteShow(show.id)} className="btn btn-danger action-button">Delete</button>
                      <button className="btn btn-primary action-button" onClick={() => handleEditShow(show)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <h2>Existing Songs</h2>
            <table className="table table-striped table-bordered text-center">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map(song => (
                  <tr key={song.id}>
                    <td>{song.title}</td>
                    <td>{song.link}</td>
                    <td>
                      <button onClick={() => handleDeleteSong(song.id)} className="btn btn-danger action-button">Delete</button>
                      <button className="btn btn-primary action-button" onClick={() => handleEditSong(song)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Modal"
      >
        <h2>Edit {editType === 'show' ? 'Show' : 'Song'}</h2>
        <form onSubmit={handleUpdate}>
          {editType === 'show' ? (
            <>
              <input
                type="text"
                name="venue"
                value={currentEditData?.venue || ''}
                onChange={handleChange}
                placeholder="Show Venue"
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                name="date"
                value={currentEditData?.date || ''}
                onChange={handleChange}
                placeholder="Show Date"
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                name="tickets"
                value={currentEditData?.tickets || ''}
                onChange={handleChange}
                placeholder="Show Tickets"
                className="form-control mb-2"
              />
            </>

          ) : (
            <>
              <input
                type="text"
                name="title"
                value={currentEditData?.title || ''}
                onChange={handleChange}
                placeholder="Song Title"
                required
                className="form-control mb-2"
              />
              <input
                type="text"
                name="link"
                value={currentEditData?.link || ''}
                onChange={handleChange}
                placeholder="Song Link"
                required
                className="form-control mb-2"
              />
            </>
          )}
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default AdminPage;