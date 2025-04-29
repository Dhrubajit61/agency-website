import React, { useState, useContext, useDebugValue, useEffect } from "react";
import axios from "axios";
import "../../assets/css/NewProject.css";
import { Responsecontext } from "../Home/Contextapi";
import Formsubmitmodal2 from "./Formsubmitmodal2";
import { Openmodal2context } from "../Home/Contextapi";

const NewProject = () => {
  const apiUrl = "http://127.0.0.1:8000";
  const { response, setResponse } = useContext(Responsecontext);
  const { openmodal2context, setOpenmodal2context } =
    useContext(Openmodal2context);

  const [formData, setFormData] = useState({
    title: "",
    business_category: "",
    development_type: [],
    description: "",
    features: [],
    budget_range: "",
    timeline: "",
    reference_links: "",
    notes: "",
    project_files: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      const updatedArray = [...formData[name]];
      if (checked) {
        updatedArray.push(value);
      } else {
        const index = updatedArray.indexOf(value);
        if (index > -1) updatedArray.splice(index, 1);
      }
      setFormData((prev) => ({ ...prev, [name]: updatedArray }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "project_files") {
        for (let i = 0; i < formData.project_files.length; i++) {
          submitData.append("project_files[]", formData.project_files[i]);
        }
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => submitData.append(`${key}[]`, item));
      } else {
        submitData.append(key, formData[key]);
      }
    });
    const token = localStorage.getItem("access_token");

    try {
      const response1 = await axios.post(
        `${apiUrl}/api/submit-requirement`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //alert("Nice, Requirement submitted successfully1!");
      setResponse(response1);

      if (response1.request.status == "200") {
        setOpenmodal2context(true);
      }
    } catch (error) {
      setResponse(error);
      setOpenmodal2context(true);
      console.error(error);
      //if(error.response.data.message)
      alert("Failed to submit requirement.");
    }
  };

  return (
    <>
      <div
        className="NewProjectdiv"
        style={{ width: "95%", marginInline: "auto" }}
      >
        <div className="NewProjectHeading" style={{ textAlign: "center" }}>
          <h1>Request for New Project</h1>
        </div>
        <div className="NewProjectForm">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Project Title */}
            <div className="Projecttitle">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Online Grocery Delivery App"
                required
              />
            </div>

            {/* Business Category */}
            <div className="businesscategory">
              <label>Business Category *</label>
              <select
                name="business_category"
                value={formData.business_category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Blog/News">Blog/News</option>
                <option value="Custom Business App">Custom Business App</option>
              </select>
            </div>

            {/* Type of Development */}
            <div className="developmenttype">
              <label>Type of Development *</label>
              <div>
                {[
                  "Website",
                  "Android App",
                  "iOS App",
                  "Admin Panel",
                  "API Only",
                ].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      name="development_type"
                      value={type}
                      onChange={handleChange}
                    />{" "}
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="projectdescription">
              <label>Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your business and what you want to build..."
                rows="5"
                required
              ></textarea>
            </div>

            {/* Features Needed */}
            <div className="featuresneeded">
              <label>Features Needed</label>
              <div>
                {[
                  "Login/Signup",
                  "Payment Gateway",
                  "Chat/Messaging",
                  "Admin Panel",
                  "Product Listing",
                  "Booking System",
                  "Blog",
                  "File Upload",
                  "Notifications",
                ].map((feature) => (
                  <label key={feature}>
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      onChange={handleChange}
                    />{" "}
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* Expected Budget */}
            <div className="expectedbudget">
              <label>Expected Budget (Optional)</label>
              <select
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
              >
                <option value="">-- Select Budget --</option>
                <option value="< ₹10,000">&lt; ₹10,000</option>
                <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                <option value="> ₹1,00,000">&gt; ₹1,00,000</option>
              </select>
            </div>

            {/* Preferred Timeline */}
            <div className="preferredtimeline">
              <label>Preferred Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">-- Select Timeline --</option>
                <option value="1–2 weeks">1–2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2–3 months">2–3 months</option>
                <option value="No rush">No rush</option>
              </select>
            </div>

            {/* Reference Websites */}
            <div className="referencewebsite">
              <label>Reference Websites</label>
              <textarea
                name="reference_links"
                value={formData.reference_links}
                onChange={handleChange}
                placeholder="e.g., swiggy.com, wix.com"
                rows="2"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="fileupload">
              <label>Upload Files (Mockups, Docs, etc.)</label>
              <input
                type="file"
                name="project_files"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                onChange={handleChange}
              />
            </div>

            {/* Additional Notes */}
            <div className="additionalnotes">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any other instructions or information..."
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Requirement</button>
          </form>
        </div>
      </div>
      {openmodal2context && <Formsubmitmodal2></Formsubmitmodal2>}
    </>
  );
};

export default NewProject;
