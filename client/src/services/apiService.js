// src/services/apiService.js
import axiosInstance from './axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import uploadFile from '../utils/fileUploadHandler';

export const postData = async (url, data, successMessage = null) => {
  try {
    const response = await axiosInstance.post(url, data);
    console.log('data: ', data);
    console.log('response: ', response);

    console.log('success: ', successMessage);
    return handleResponse(response, successMessage);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const getData = async url => {
  try {
    const response = await axiosInstance.get(url);
    console.log('response: ', response.data.data);
    return handleResponse(response.data.data);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const deleteData = async url => {
  try {
    const response = await axiosInstance.delete(url);
    console.log('response: ', response);
    return handleResponse(response);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const uploadFileToCloudinary = async (
  file,
  onUploadProgress,
  folder,
  resourceType,
  setError // Add setError parameter
) => {
  try {
    const uploadedImageUrl = await uploadFile(
      file,
      onUploadProgress,
      folder,
      resourceType
    );

    return uploadedImageUrl;
  } catch (error) {
    handleError(error, setError); // Pass setError to handleError
    throw error; // Re-throw to stop execution
  }
};
