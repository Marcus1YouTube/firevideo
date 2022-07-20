import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseClient";

export default function WatchVideo() {
  const videoId = useParams("videoId");
  const [video, setVideo] = useState({});
  const [videoURL, setVideoURL] = useState("");
  useEffect(() => {
    getVideo();
  });
  const getVideo = async () => {
    const docRef = doc(db, "videos", videoId.videoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setVideo(docSnap.data());
      getVideoFromBucket();
    } else {
      alert("Video not found! Go back to the home page to see all videos!");
    }
  };

  const getVideoFromBucket = () => {
    getDownloadURL(ref(storage, video.location)).then((url) => {
      setVideoURL(url);
    });
  };

  return (
    <div className="VideoWatch">
      {videoURL ? <video controls src={videoURL} /> : <h1>Loading...</h1>}
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <a href={videoURL} download className="downloadbtt">
        Download this video...
      </a>
      <br />
      <br />
      <Link to="/">
        <button className="backhome">Go back to home page</button>
      </Link>
    </div>
  );
}
