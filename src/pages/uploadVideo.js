// video uploading page to fireabase:
import { useState } from "react";
import { db, storage } from "../firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

export default function UploadVideo() {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ video, setVideo ] = useState();
    const [ progress, setProgress ] = useState(0);


    const handleSubmit = async () => {
        if (!video) {
            alert("Please choose a file first!")
            return;
        } else {
            const docRef = await addDoc(collection(db, "videos"), {
                title: title,
                description: description,
                location: `videos/${video.name}`
            });
            console.log("Document written with ID: ", docRef.id);
            const storageRef = ref(storage, `/videos/${video.name}`)
            const uploadTask = uploadBytesResumable(storageRef, video);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
         
                    // update progress
                    setProgress(percent);
                },
                (err) => console.log(err),
                () => {
                    alert("Video uploaded successfully! Redirecting to home page...");
                    window.location.href = "/";
                }
            );

        }

    }
    return (
        <div className="UploadVideo">
            <Link to="/">
                <button className="backhome">Go back to home page</button>
            </Link>
            <h1>Upload a video</h1>
            <label>Title:</label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Description:</label>
            <textarea name="description" onChange={(e) => setDescription(e.target.value)} />
            <br />
            <label>Video:</label>
            <input type="file" accept="video/*" name="video" onChange={(e) => setVideo(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit}>Upload</button>
            <progress value={progress} max="100" />
        </div>
    )
}