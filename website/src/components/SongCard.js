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
        <div className="card-body d-flex flex-column center">
          <div className="video-container">
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
            <p className="artist-text text-muted">By: Andro!dz</p>
          </div>
          <h3 className="card-title text-center">{song.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default SongCard;