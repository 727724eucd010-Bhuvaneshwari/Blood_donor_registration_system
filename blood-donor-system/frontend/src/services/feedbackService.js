import api from "../api/axiosInstance";
const feedbackService={
  submitFeedback:async data=>(await api.post("/feedback",data)).data,
  getFeedbackByCenter:async id=>(await api.get(`/feedback/center/${id}`)).data,
  getAllFeedback:async()=> (await api.get("/admin/feedback")).data,
};
export default feedbackService;
