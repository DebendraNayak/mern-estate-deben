import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePercentage);
  console.log(fileUploadError);
  console.log(formData);

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);
  
  const handleFileUpload = (file) => {
     const storage = getStorage(app);
     const fileName = new Date().getTime() + file.name;
     const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
        },
        (error) => {
          setfileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL})
          });
        }
     );
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center my-7 font-semibold'>
    Profile
    </h1>
    <form className='flex flex-col gap-4'>
    <input type='file' onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'></input>
    <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="profile"></img>
   <p>
       {
        fileUploadError ? (
          <span className='text-red-700'>Error Image Upload</span>
        ) : filePercentage > 0 && filePercentage < 100 ? (
          <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
        ) : filePercentage === 100 ? (
          <span className='text-green-700'>Image successfully Uploaded!</span>
        ) : (
          ''
        )
        
       }
   </p>
    <input type='text' placeholder="username" id="username" className='border rounded-lg p-3'></input>
    <input type='text' placeholder="email" id="email" className='border rounded-lg p-3'></input>
    <input type='text' placeholder="password" id="password" className='border rounded-lg p-3'></input>
    <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
    </form>
    <div className='flex justify-between mt-4'>
     <span className='text-red-700 cursor-pointer'>Delete account</span>
     <span className='text-red-700 cursor-pointer'>Sign out</span>
    </div>
    </div>
  )
}
