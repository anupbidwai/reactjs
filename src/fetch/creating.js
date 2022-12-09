import { useEffect, useRef, useState } from "react";
import { galleryAPI, GALLERY_URL } from "../api/gallery";
import Photo from "../components/Photo";

const Create = () => {
    const thumbnailUrlRef = useRef();
    const titleRef = useRef();
    const alubmnIdRef = useRef();

    const [photo, setPhoto] = useState();
    const [alumbs, setAlbums] = useState();

    const loadAlbumsIds = async () => {
        const res = await fetch(GALLERY_URL);
        const alumbs = await res.json();

        // get unique album ids
        const alumbsSet = new Set();
        alumbs.forEach(alubm => alumbsSet.add(alubm.albumId));
        setAlbums([...alumbsSet])
    };

    const alumbmIds = alumbs
        && alumbs.map(id => <option value={id} key={id}>{id}</option>);

    const handleSubmit = (event) => {
        event.preventDefault();

        const item = {
            albumId: alubmnIdRef.current.value,
            thumbnailUrl: thumbnailUrlRef.current.value,
            title: titleRef.current.value,
            url: "https://via.placeholder.com/600/810b14"
        }

        galleryAPI.createThumbnail(item)
            .then(res => res.json())
            .then(data => setPhoto(data))
    }

    useEffect(() => {
        loadAlbumsIds();
    }, []);

    return (
        <>
            {
                alumbs ? (
                    <>
                        <h1 style={{ textAlign: 'center' }}>Create Thumbnail</h1>
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                            <select ref={alubmnIdRef}>
                                <option>Select album</option>
                                {alumbmIds}
                            </select>
                            <input type="text" placeholder="Thumbnail URL" ref={thumbnailUrlRef} />
                            <input type="text" placeholder="Title" ref={titleRef} />
                            <button type="sbumit">create</button>
                        </form></>
                ) : "Loading..."
            }
            {
                photo && <Photo photo={photo} />
            }
        </>
    )
};
export default Create;