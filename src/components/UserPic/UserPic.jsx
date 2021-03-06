import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import Upload from '../Upload/Upload';

export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <div className="gallery">
                <Upload />
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="250"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}
