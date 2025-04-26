import axios from 'axios';

export const fetchGames = async () => {
  const response = await axios.post('http://localhost:3001/games');
  return response.data;
};

export const fetchRandomGame = async () => {
  const response = await axios.post('http://localhost:3001/games/random');
  return response.data;
};

export const fetchPlatforms = async () => {
  const response = await axios.post('http://localhost:3001/platforms');
  return response.data;
};