import { useState } from "react";
import { FaClipboardCheck, FaInfoCircle } from "react-icons/fa";
import eligibilityService from "../services/eligibilityService";

const initial = {
  age: "", weightKg: "", lastDonationDate: "", recentTravel: false,
  recentIllness: false, onMedication: false, recentTattooOrSurgery: false,
  pregnancyOrBreastfeeding: false
};

function Eligibility() {
  const [formData, setFormData] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setResult(null);
    try {
      const data = await eligibilityService.checkEligibility({
        ...formData,
        age: Number(formData.age),
        weightKg: Number(formData.weightKg),
        lastDonationDate: formData.lastDonationDate || null
      });
      setResult(data);
    } catch (error) {
      setResult({ result: "Unable to complete screening", reason: error.response?.data?.error || "Please try again." });
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-5">
      <div className="gov-section-title">
        <h2><FaClipboardCheck className="me-2" />Donor Eligibility Pre-Screening</h2>
        <p>A quick pre-screen before you visit a blood donation centre.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="panel-card eligibility-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label>Age</label><input name="age" type="number" min="1" max="100" className="form-control" value={formData.age} onChange={change} required /></div>
                <div className="col-md-6"><label>Weight (kg)</label><input name="weightKg" type="number" min="1" step="0.1" className="form-control" value={formData.weightKg} onChange={change} required /></div>
                <div className="col-12"><label>Last blood donation date <span className="text-muted fw-normal">(leave blank if never donated)</span></label><input name="lastDonationDate" type="date" className="form-control" value={formData.lastDonationDate} onChange={change} /></div>
              </div>

              <div className="screening-list mt-4">
                {[
                  ["recentIllness", "Have you had fever or a significant illness recently?"],
                  ["recentTattooOrSurgery", "Have you had a recent tattoo, piercing or surgery?"],
                  ["onMedication", "Are you currently taking medication that needs medical review?"],
                  ["recentTravel", "Have you travelled recently and may need travel-related screening?"],
                  ["pregnancyOrBreastfeeding", "Are you currently pregnant or breastfeeding?"],
                ].map(([name, label]) => (
                  <label className="screening-row" key={name}>
                    <input type="checkbox" name={name} checked={formData[name]} onChange={change} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <button className="btn btn-danger rounded-pill px-4 mt-4" disabled={loading}>{loading ? "Checking..." : "Check Eligibility"}</button>
            </form>

            {result && (
              <div className={`eligibility-result mt-4 ${result.result?.startsWith("Eligible") ? "eligible" : "review"}`}>
                <strong>{result.result}</strong>
                <p className="mb-0 mt-1">{result.reason}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="info-card">
            <FaInfoCircle />
            <h5>Important</h5>
            <p>This is an academic pre-screening tool. It does not replace the medical assessment performed by a qualified blood donation centre.</p>
            <ul>
              <li>Use your current age and approximate weight.</li>
              <li>Enter your last whole-blood donation date when applicable.</li>
              <li>If you are unsure about a medical question, ask the donation centre before donating.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Eligibility;
