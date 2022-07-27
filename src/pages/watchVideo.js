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
  }, []);
  const getVideo = async () => {
    const docRef = doc(db, "videos", videoId.videoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setVideo(docSnap.data());
      getVideoFromBucket();
    } else {
      alert(
        "Videó nem található! Fáradj vissza a főoldalra, hogy láthasd az összes videót!"
      );
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
        Videó letöltése...
      </a>
      <br />
      <br />
      <Link to="/">
        <button className="backhome">Vissza a főoldalra</button>
      </Link>
      <hr />
      <h1>Kommentek</h1>
      {video.comments.map((comment) => (
        <>
          <div>
            <p>{comment}</p>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
