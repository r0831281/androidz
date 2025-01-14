import React, { useState, useEffect } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { makeShow, makeSong, fetchShows, fetchSongs, deleteShow, deleteSong, updateShow, updateSong } from '../services/showService';
import Login from './Login';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [shows, setShows] = useState([]);
    const [songs, setSongs] = useState([]);
    const [showsCurrentPage, setShowsCurrentPage] = useState(1);
    const [songsCurrentPage, setSongsCurrentPage] = useState(1);
    const [dataChanged, setDataChanged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState(null);
    const [editType, setEditType] = useState('');
    const itemsPerPage = 5;

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
        event.target.reset();
    };

    const handleCreateSong = async (event) => {
        event.preventDefault();
        await makeSong(event);
        setDataChanged(!dataChanged);
        event.target.reset();
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

    const getVisibleShows = () => {
        const startIndex = (showsCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return shows.slice(startIndex, endIndex);
    };

    const getVisibleSongs = () => {
        const startIndex = (songsCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return songs.slice(startIndex, endIndex);
    };

    const showsPageCount = Math.ceil(shows.length / itemsPerPage);
    const songsPageCount = Math.ceil(songs.length / itemsPerPage);

    return (
        <div className="container mt-5 text-light">
            <h2 className="mb-4">Admin Page</h2>
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>
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
                        <h2>Existing Shows</h2>
                        <Table striped bordered hover responsive variant="dark"> {/* Added variant */}
                            <thead>
                                <tr>
                                    <th>Venue</th>
                                    <th>Date</th>
                                    <th>Tickets/video</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getVisibleShows().map(show => (
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
                        </Table>
                        <Pagination>
                            <Pagination.Prev onClick={() => setShowsCurrentPage(Math.max(1, showsCurrentPage - 1))} disabled={showsCurrentPage === 1} />
                            {Array.from({ length: showsPageCount }, (_, i) => (
                                <Pagination.Item key={i + 1} active={showsCurrentPage === i + 1} onClick={() => setShowsCurrentPage(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setShowsCurrentPage(Math.min(showsPageCount, showsCurrentPage + 1))} disabled={showsCurrentPage === showsPageCount} />
                        </Pagination>
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
                        <h2>Existing Songs</h2>
                        <Table striped bordered hover responsive variant="dark"> {/* Added variant */}
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Link</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getVisibleSongs().map(song => (
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
                        </Table>
                        <Pagination>
                            <Pagination.Prev onClick={() => setSongsCurrentPage(Math.max(1, songsCurrentPage - 1))} disabled={songsCurrentPage === 1} />
                            {Array.from({ length: songsPageCount }, (_, i) => (
                                <Pagination.Item key={i + 1} active={songsCurrentPage === i + 1} onClick={() => setSongsCurrentPage(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setSongsCurrentPage(Math.min(songsPageCount, songsCurrentPage + 1))} disabled={songsCurrentPage === songsPageCount} />
                        </Pagination>
                    </div>
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )}

<Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
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