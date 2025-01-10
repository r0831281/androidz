import React from 'react';
import { makeShow, makeSong } from '../services/showService';
import Login from './Login';

function AdminPage() {

  return (
    <div>
      <h2>Admin Page</h2>
      <Login />
      <p>This is content that only authorized admins can access.</p>
      <div>
        <h2>Create Show</h2>
        <form onSubmit={makeShow}>
          <input type="text" placeholder="Show Locatie" name="showVenue" required />
          <input type="text" placeholder="Show Date" name="showDate" required />
          <button type="submit">Create Show</button>
        </form>
        <h2>Create Songs</h2>
        <form onSubmit={makeSong}>
          <input type="text" placeholder="Song Title" name="songTitle" required />
          <input type="text" placeholder="Song Link" name="songLink" required />
          <button type="submit">Create Song</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;