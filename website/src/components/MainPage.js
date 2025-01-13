import React, { useEffect, useState } from 'react';
import moment from 'moment'; // Import moment.js
import { fetchShows, fetchSongs, sendMail } from '../services/showService'; // Import the service
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
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
      <div className="card mb-4" style={{ borderRadius: '16px', border: 'none', width: '100%' }}>
        <div className="card-body d-flex flex-column">
          <h3 className="card-title">{song.title}</h3>
          <p className="card-text text-muted">By: Andro!dz</p>
          {embedUrl && (
            <div className="ratio ratio-16x9 mt-auto">
              <iframe
                src={embedUrl}
                title={song.title}
                className="card-img-top"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function MainPage() {
    const [shows, setShows] = useState([]);
    const [songs, setSongs] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // Contact form state
  
    useEffect(() => {
      const getInitialShows = async () => {
        const fetchedShows = await fetchShows();
        const fetchedSongs = await fetchSongs();
        setShows(fetchedShows);
        setSongs(fetchedSongs);
      };
      getInitialShows();
    }, []);
  
    // Handle contact form input change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    // Handle contact form submission
    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData); 
      alert('Thank you for reaching out! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' }); // Reset the form
    };
  
    // Sort shows by date in descending order
    const sortedShows = shows.slice().sort((a, b) => {
      const dateA = moment(a.date, 'DD/MM/YY').valueOf();
      const dateB = moment(b.date, 'DD/MM/YY').valueOf();
      return dateB - dateA;
    });
  
    return (
      <div className="container-fluid vh-100 text-white">
        <LightningFlash />
  
        <div className="text-center py-4">
          <img src="wit.svg" alt="A N D R O ! D Z" className="mx-auto mb-4" width="100%" style={{ maxHeight: '250px' }} />
          <h1 className="display-4 text-warning Orbitron">Songs</h1>
        </div>
  
        <div className="container mb-5">
          <div className="row g-4 d-flex justify-content-around">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
  
        <div className="container mb-5">
          <h1 className="display-4 text-warning text-center mb-4 Orbitron">Shows</h1>
          <div className="table-responsive">
            <table className="table table-bordered text-center rounded-lg">
              <thead className="table-dark">
                <tr>
                  <th>Venue</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedShows.map((show) => {
                  const showDate = moment(show.date, 'DD/MM/YY').toDate();
                  const isPastShow = showDate < new Date();
                  return (
                    <tr key={show.id} className={isPastShow ? 'bg-light' : 'bg-secondary text-white'}>
                      <td className={isPastShow ? 'text-muted bg-secondary' : 'bg-light'}>{show.venue}</td>
                      <td className={isPastShow ? 'text-muted bg-secondary' : 'bg-light'}>
                        {moment(show.date, 'DD/MM/YY').format('MMMM Do, YYYY')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Contact Form Section */}
        <div className="container mb-5">
          <h1 className="display-4 text-warning text-center mb-4 Orbitron">Contact Us</h1>
          <form onSubmit={handleFormSubmit} className="p-4 bg-dark rounded">
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-warning">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-warning">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label text-warning">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning w-100">Send Message</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default MainPage;
  