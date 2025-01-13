import React from 'react';
// example link 6hwGwCfCwHoSJQw7AYPEQu

const SpotifySongs = ({ songLinks }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {songLinks.map((link, index) => (
                <iframe
                    key={index}
                    src={`https://open.spotify.com/embed/track/${link}`}
                    width="600"
                    height="100"
                    frameBorder="5"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title={`Spotify Song ${index}`}
                ></iframe>
            ))}
        </div>
    );
};

export default SpotifySongs;