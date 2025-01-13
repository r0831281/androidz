import React, { useEffect, useState } from 'react';
import moment from 'moment'; // Import moment.js
import { fetchShows, fetchSongs } from '../services/showService'; // Import the service
import '../index.css'; // Add this line to import the CSS file
import LightningFlash from './LightningFlash'; 

// SongCard Component
const SongCard = ({ song }) => {
    let videoId = '';
    try {
        videoId = new URL(song.link).searchParams.get('v'); // Extract YouTube video ID from the link
    } catch (error) {
        console.error('Invalid URL:', song.link);
    }
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h3 style={{ margin: 0 }}>{song.title}</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>By: Andro!dz</p>
            {embedUrl && (
                <div style={{ marginTop: '10px', overflow: 'hidden', borderRadius: '8px' }}>
                    <iframe
                        width="100%"
                        height="200"
                        src={embedUrl}
                        title={song.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

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

    const sortedShows = shows.slice().sort((a, b) => {
        const dateA = moment(a.date, 'DD/MM/YY').valueOf();
        const dateB = moment(b.date, 'DD/MM/YY').valueOf();
        console.log('Parsed Date A:', dateA, 'Parsed Date B:', dateB);
        return dateB - dateA;
    });

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Orbitron, sans-serif',
                textAlign: 'center',
                backgroundColor: '#000',
                minHeight: '100vh',
                color: '#fff',
            }}
        >
            {/* Include the LightningFlash component */}
            <LightningFlash />
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }} className="silkscreen-bold">A N D R O ! D Z</h1>
            <h2 style={{ color: '#FF5722' }}>Songs</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                }}
            >
                {songs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
            <h2 style={{ color: '#FF5722' }}>Shows</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
            >
                <table
                    className="table table-striped table-bordered text-center"
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        backgroundColor: '#222',
                        color: '#fff',
                        border: '1px solid #444',
                        borderRadius: '8px',
                    }}
                >
                    <thead style={{ backgroundColor: '#333' }}>
                        <tr>
                            <th>Venue</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedShows.map((show) => {
                            const isPastShow = new Date(show.date) < new Date();
                            return (
                                <tr
                                    key={show.id}
                                    style={{
                                        backgroundColor: isPastShow ? '#555' : '#444',
                                    }}
                                >
                                    <td>{show.venue}</td>
                                    <td>{show.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MainPage;