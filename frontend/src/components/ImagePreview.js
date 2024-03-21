import React, { useState } from "react";


function ImagePreview(props) {
    const [previewSrc, setPreviewSrc] = useState(props.image_url);

    const handleImageHover = (e) => {
        const href = e.target.getAttribute("href");
        setPreviewSrc(href);
    }

    return (
        <td className="td-image">
            <a href={ props.image_url } className="image-link" onMouseMove={handleImageHover}>Image</a>

            <img src={ previewSrc } alt="" className="preview-image" />
        </td>
    )
}

export default ImagePreview;
