import "./styles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseClient";

export default function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getAllVideos();
  });

  const getAllVideos = async () => {

    const data = await getDocs(collection(db, "videos"));
    setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div className="App">
      <Link to="/upload"><button>Upload a video</button></Link>
      <h1>All Videos List</h1>
      <div className="grid">
        {videos.map((video) => (
          <Link to ={`/watch/${video.id}`} key={video.id}>
            <div key={video.id} className="vidcard">
              <h1>{video.title}</h1>
              <p>{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
