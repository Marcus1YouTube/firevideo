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
            alert("Válassz egy videót elöször!");
            return;
        } else {
            const docRef = await addDoc(collection(db, "videos"), {
                title: title,
                description: description,
                location: `videos/${video.name}`,
                comments: []
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
                    alert("Videó sikeresen feltöltve! Visszairányítás a főoldalra...");
                    window.location.href = "/";
                }
            );

        }

    }
    return (
        <div className="UploadVideo">
            <Link to="/">
                <button className="backhome">Vissza a főoldalra</button>
            </Link>
            <h1>Tölts fel egy videót</h1>
            <label>Cím:</label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Leírás:</label>
            <textarea name="description" onChange={(e) => setDescription(e.target.value)} />
            <br />
            <label>Videó:</label>
            <input type="file" accept="video/*" name="video" onChange={(e) => setVideo(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit}>Feltöltés</button>
            <progress value={progress} max="100" />
        </div>
    )
}