import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://datastraw-oyx8.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getTickets = async ({
  search = "",
  priority = "",
  status = "",
  page = 1,
  limit = 20
} = {}) => {
  const response = await apiClient.get("/tickets", {
    params: {
      search: search || undefined,
      status: status || undefined,
      priority: priority || undefined,
      page,
      limit
    }
  });

  return response.data;
};

export const getTicketById = async (ticketId) => {
  const response = await apiClient.get(
    `/tickets/${ticketId}`
  );

  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await apiClient.post(
    "/tickets",
    ticketData
  );

  return response.data;
};

export const updateTicket = async (
  ticketId,
  data
) => {
  const response = await apiClient.put(
    `/tickets/${ticketId}`,
    data
  );

  return response.data;
};