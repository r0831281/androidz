import { collection, getDocs, addDoc, deleteDoc, doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";

export const fetchShows = async () => {
  try {
    const showsCollection = collection(db, "Shows");
    const showSnapshot = await getDocs(showsCollection);
    const shows = showSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return shows;
  } catch (error) {
    console.error("Error fetching shows: ", error.message);
    return [];
  }
};

export const fetchSongs = async () => {
  try {
    const songsCollection = collection(db, "Songs");
    const songSnapshot = await getDocs(songsCollection);
    const songs = songSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return songs;
  } catch (error) {
    console.error("Error fetching songs: ", error.message);
    return [];
  }
}

export const makeSong = async (event) => {
  event.preventDefault();
  try {
    const songTitle = event.target.songTitle.value;
    const songLink = event.target.songLink.value;
    const songsCollection = collection(db, "Songs");
    await addDoc(songsCollection, { title: songTitle, link: songLink });
    console.log("Song created successfully");
  } catch (error) {
    console.error("Error creating song: ", error.message);
    event.target.reset();
  }
}

export const makeShow = async (event) => {
  event.preventDefault();
  try {
    const showVenue = event.target.showVenue.value;
    const showDate = event.target.showDate.value;
    const showsCollection = collection(db, "Shows");
    await addDoc(showsCollection, { venue: showVenue, date: showDate });
    console.log("Show created successfully");
  } catch (error) {
    console.error("Error creating show: ", error.message);
    event.target.reset();
  }
};

export const adminCheck = async () => {
  const whitelistedEmails = collection(db, "Admins"); // Reference to the "Admin" collection
  const adminSnapshot = await getDocs(whitelistedEmails); // Get documents from the collection
  const whitelisted = adminSnapshot.docs.map(doc => doc.data().email); // Extract email from each document

  console.log("Whitelisted emails: ", whitelisted); // Array of whitelisted emails
  return whitelisted;
};

export const deleteShow = async (showId) => {
  try {
    await deleteDoc(doc(db, "Shows", showId));
    console.log("Show deleted successfully");
  } catch (error) {
    console.error("Error deleting show: ", error.message);
  }
}

export const deleteSong = async (songId) => {
  try {
    await deleteDoc(doc(db, "Songs", songId));
    console.log("Song deleted successfully");
  } catch (error) {
    console.error("Error deleting song: ", error.message);
  }
}


export const updateShow = async (showId, updatedShow) => {
  try {
    await setDoc(doc(db, "Shows", showId), updatedShow);
    console.log("Show updated successfully");
  } catch (error) {
    console.error("Error updating show: ", error.message);
  }
}

export const updateSong = async (songId, updatedSong) => {
  try {
    await setDoc(doc(db, "Songs", songId), updatedSong);
    console.log("Song updated successfully");
  } catch (error) {
    console.error("Error updating song: ", error.message);
  }
}


