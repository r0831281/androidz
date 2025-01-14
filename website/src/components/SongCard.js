import React, { useState } from 'react';

const SongCard = ({ song }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  let videoId = '';
  try {
    videoId = new URL(song.link).searchParams.get('v'); // Extract YouTube video ID from the link
  } catch (error) {
    console.error('Invalid URL:', song.link);
  }
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
      <div
        className="card mb-4"
        style={{
          borderRadius: '16px',
          border: 'none',
          width: '100%',
        }}
      >
        <div className="card-body d-flex flex-column align-items-center">
          <div
            className="video-container"
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 ratio
              borderRadius: '8px',
              overflow: 'hidden', // Ensures content doesn't spill out
              backgroundColor: '#333', // Placeholder background color
            }}
          >
            {/* Placeholder */}
            {!isLoaded && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#444',
                  animation: 'pulse 1.5s infinite',
                }}
              />
            )}

            {/* YouTube Iframe */}
            {embedUrl && (
              <iframe
                src={embedUrl}
                title={song.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  visibility: isLoaded ? 'visible' : 'hidden', // Initially hidden
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoaded(true)} // Trigger iframe visibility
              />
            )}
          </div>
          <p className="artist-text text-muted mt-2">By: Andro!dz</p>
          <h3 className="card-title text-center">{song.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
