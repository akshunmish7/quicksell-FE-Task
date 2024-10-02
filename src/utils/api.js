const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    return data.tickets || [];  // Adjust based on API response structure
  } catch (error) {
    console.error('Failed to fetch tickets', error);
    return [];
  }
};
