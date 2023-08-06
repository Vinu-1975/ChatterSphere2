import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AvatarComponent() {
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    const getAvatar = async () => {
      // try {
      //   const name = 'myUniqueName'; // Replace this with the name you want
      //   const response = await axios.get(`http://localhost:5000/avatar/${name}`, { responseType: 'blob' });
      //   // console.log(response)
      //   const blobURL = URL.createObjectURL(new Blob([response.data]));
      //   console.log(blobURL)
      //   setAvatarURL(blobURL);
      // } catch (error) {
      //   console.error(`Failed to fetch avatar: ${error}`);
      // }
      let avatarId = 'Biddnx Bond'
      fetch('https://api.multiavatar.com/'
      +JSON.stringify(avatarId))
        .then(res => res.text())
        .then(svg => setAvatarURL(svg))
    };

    getAvatar();
  }, []);

  return (
    <div>
      {avatarURL && (
         <div dangerouslySetInnerHTML={{ __html: avatarURL }} />
      )}
    </div>
  );
}

export default AvatarComponent;
