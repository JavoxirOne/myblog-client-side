import React, { useState, useEffect } from "react";

const ImageWithPlaceholder = ({ imgUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const placeholderImg = "https://via.placeholder.com/150";

  // Reset imageLoaded state variable whenever imgUrl is updated
  useEffect(() => {
    setImageLoaded(false);
  }, [imgUrl]);

  return (
    <img
      src={imageLoaded ? imgUrl : placeholderImg}
      alt="Image"
      onLoad={() => setImageLoaded(true)}
    />
  );
};

export default ImageWithPlaceholder;