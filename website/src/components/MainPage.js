import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment'; 
import { fetchShows, fetchSongs } from '../services/showService'; 
import '../index.css'; 
import LightningFlash from './LightningFlash';
import SongCard from './SongCard';
import ButtonComponent from './ButtonComponent';
import HeroSection from './HeroSection'; // Import the HeroSection component

function MainPage() {
  const [shows, setShows] = useState([]);
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); 
  const submitButtonRef = useRef(null); 
  
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    submitButtonRef.current.disabled = true; // Disable submit button

    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch("https://formsubmit.co/ajax/ndroidz.mgmt@gmail.com", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        console.log('Message sent successfully. response:', result);
        alert('Thank you for reaching out! We will get back to you soon.');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      submitButtonRef.current.disabled = false; // Re-enable submit button after processing
    }

    setFormData({ name: '', email: '', message: '' }); // Reset the form
  };

  // Sort shows by date in descending order
  const sortedShows = shows.slice().sort((a, b) => {
    const dateA = moment(a.date, 'DD/MM/YY').toDate();
    const dateB = moment(b.date, 'DD/MM/YY').toDate();
  
    const isUpcomingA = dateA >= new Date(); // Check if show A is upcoming
    const isUpcomingB = dateB >= new Date(); // Check if show B is upcoming
  
    if (isUpcomingA && !isUpcomingB) return -1; // Upcoming shows come first
    if (!isUpcomingA && isUpcomingB) return 1;  // Past shows come after
    return dateA - dateB; // Sort upcoming shows in ascending order and past in descending
  });

  return (
    <div className="container-fluid vh-100 text-white text-center">
      <LightningFlash />
      <img
        src="wit.svg"
        alt="A N D R O ! D Z"
        className="mx-auto mb-4"
        style={{ width: '100%', maxWidth: '79%', paddingTop: '65px' }}
        loading="lazy"
      />

      <div className="row mb-4">
        <div className="col">
          <HeroSection />
        </div>
      </div>
      
      {/* <div className="row mb-4">
        <div className="col">
          <ButtonComponent text={"Stem Nu op ons voor de nieuwe lichting!"} url={"https://www.vrt.be/interactie/stem/De-Nieuwe-Lichting-2025/"} />
        </div>
      </div> */}

      <div className="text-center py-4">
        <h1 className="display-1 text-warning Orbitron">Songs</h1>
      </div>

      <div className='container mb-5' style={{ minHeight: '400px', maxWidth: '1200px' }}>
        <div className="row g-4 d-flex justify-content-center">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

      <div className="container mb-5 table-responsive" style={{ minHeight: '500px', maxWidth: '1200px' }}>
        <h1 className="display-1 text-warning text-center mb-4 Orbitron">Shows</h1>
        <div className="table-responsive">
          <table className="table table-bordered text-center rounded-lg" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead className="table-dark">
              <tr>
                <th>Venue</th>
                <th>Date</th>
                <th>Tickets</th>
              </tr>
            </thead>
            <tbody>
              {sortedShows.map((show) => {
                const showDate = moment(show.date, 'DD/MM/YY').toDate();
                const isPastShow = showDate < new Date();
                return (
                  <tr
                    key={show.id}
                    style={{ minHeight: '60px', overflow: 'hidden' }}  // Added for CLS prevention
                    className={isPastShow ? 'bg-light' : 'bg-secondary text-white'}
                  >
                    <td className={isPastShow ? 'text-muted bg-secondary' : 'bg-light'}>{show.venue}</td>
                    <td className={isPastShow ? 'text-muted bg-secondary' : 'bg-light'}>
                      {moment(show.date, 'DD/MM/YY').format('MMMM Do, YYYY')}
                    </td>
                    <td className={isPastShow ? 'text-muted bg-secondary' : 'bg-light'}>
                      {show.tickets ? (
                        <a
                          href={show.tickets}
                          className="btn btn-warning"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {isPastShow ? 'Video' : 'Tickets'}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mb-5 p-4" style={{ maxWidth: '1200px' }}>
        <h1 className="display-1 text-warning text-center mb-4 Orbitron">Contact Us</h1>
        <form onSubmit={handleFormSubmit} className="p-6 rounded">
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
          <button type="submit" className="btn btn-warning w-100" ref={submitButtonRef}>Send Message</button>
        </form>
      </div>

      <footer className="footer">
        <div className="social-icons">
          <a href="https://www.instagram.com/androidz_music/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-icon" width="30" height="30" loading="lazy" />
          </a>
          <a href="https://linktr.ee/androidz_music" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.brandfetch.io/id_tNIm05N/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="Linktree" className="social-icon" width="30" height="30" loading="lazy" />
          </a>
          <a href="https://open.spotify.com/artist/0s9J0JZdj9HbTfjpV7fjn4?si=6gYxdmPUTpikrz2eg7OZlg" target="_blank" rel="noopener noreferrer">
            <img src="spotify.png" alt="Spotify" className="social-icon" width="30" height="30" loading="lazy" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;