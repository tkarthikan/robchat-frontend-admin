import axios from 'axios';

const CHAT_SERVICE_URL = window.configs.apiUrl;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${CHAT_SERVICE_URL}/auth/allusers/0`,
    {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; 
  }
};

export const getMessages = async () => {
  try {
    const response = await axios.post(`${CHAT_SERVICE_URL}/messages/getmsg`,
    {
      from: 35,
      to: 134,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching message details:', error);
    throw error; 
  }
};