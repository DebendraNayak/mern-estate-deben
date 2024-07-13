import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutUserStart, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

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
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
       dispatch(deleteUserStart());
       console.log(currentUser);
       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
         method: 'DELETE',
       });
       const data = await res.json();
       if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
       }
       dispatch(deleteUserSuccess(data));
    } catch (error) {
       dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center my-7 font-semibold'>
    Profile
    </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
    <input type='text' placeholder="username" defaultValue={currentUser.username} onChange={handleChange} id="username" className='border rounded-lg p-3'></input>
    <input type='text' placeholder="email" defaultValue={currentUser.email} onChange={handleChange} id="email" className='border rounded-lg p-3'></input>
    <input type='password' placeholder="password" id="password" onChange={handleChange} className='border rounded-lg p-3'></input>
    <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Update'}</button>
    </form>
    <div className='flex justify-between mt-4'>
     <span className='text-red-700 cursor-pointer' onClick={handleDelete}>Delete account</span>
     <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
    </div>
    <p className='text-red-700 mt-5'>{error ? error : ''}</p>
    <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated Successfully' : ''}</p>
    </div>
  )
}
