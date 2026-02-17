import axios from 'axios';

export const getLatLngFromAddress = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search`;

  const response = await axios.get(url, {
    params: {
      q: address,
      format: 'json',
      limit: 1,
    },
    headers: {
      'User-Agent': 'nestjs-app',
    },
  });

  if (!response.data.length) {
    return { lat: null, lng: null };
  }

  return {
    lat: Number(response.data[0].lat),
    lng: Number(response.data[0].lon),
  };
};
