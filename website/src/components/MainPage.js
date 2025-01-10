import React, { useEffect, useState } from 'react';
import { fetchShows, fetchSongs } from '../services/showService'; // Import the service
 // Import useNavigate

function MainPage() {
    const [shows, setShows] = useState([]);
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        const getInitialShows = async () => {
            const fetchedShows = await fetchShows();
            const fetchedSongs = await fetchSongs();
            setShows(fetchedShows);
            setSongs(fetchedSongs);
        };
        getInitialShows();
    }, []);



    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>A N D R O ! D Z</h1>
            <h2 style={{ color: '#FF5722' }}>Songs</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {songs.map((song) => (
                    <li key={song.id} style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>{song.title}</span> - Andro!dz
                        <a href={song.link} target='blank' style={{ marginLeft: '10px', color: '#2196F3' }}>listen</a>
                    </li>
                ))}
            </ul>
            <h2 style={{ color: '#FF5722' }}>Shows</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {shows.map((show) => (
                    <li key={show.id} style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>{show.venue}</span> - {show.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainPage;