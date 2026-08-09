import api from "../api/axiosInstance";
const appointmentService = {
  bookAppointment: async (payload) => (await api.post("/appointments/book", payload)).data,
  cancelAppointment: async (id) => (await api.put(`/appointments/${id}/cancel`)).data,
  completeAppointment: async (id) => (await api.put(`/appointments/${id}/complete`)).data,
  getMyAppointments: async () => (await api.get("/appointments/my")).data,
  getMyHistory: async () => (await api.get("/appointments/my/history")).data,
  getAppointmentsByDonor: async (id) => (await api.get(`/appointments/donor/${id}`)).data,
  getDonationHistory: async (id) => (await api.get(`/appointments/donor/${id}/history`)).data,
};
export default appointmentService;
