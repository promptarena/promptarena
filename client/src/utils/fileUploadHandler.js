import axiosInstance from '../services/axiosInstance';

const uploadFile = async (
  file,
  onUploadProgress,
  folder = 'general',
  resourceType = 'auto'
) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file); // Use 'profileImage' as key
    formData.append('folder', folder);
    formData.append('resource_type', resourceType);

    const response = await axiosInstance.post(
      '/user/profile/image', // Correct backend route
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      }
    );

    return response.data.data.secure_url; // Return the secure URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw for higher-level handling
  }
};

export default uploadFile;
