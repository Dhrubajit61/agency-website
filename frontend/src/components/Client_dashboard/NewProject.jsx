import React from "react";
import "../../assets/css/NewProject.css";

const NewProject = () => {
  return (
    <>
      <div
        className="NewProjectdiv"
        style={{ width: "70%", marginInline: "auto" }}
      >
        <div className="NewProjectHeading" style={{ textAlign: "center" }}>
          <h1>Request for New Project</h1>
        </div>
        <div className="NewProjectForm">
          <form
            action="/submit-requirement"
            method="POST"
            encType="multipart/form-data"
          >
            {/* Project Title */}
            <div className="Projecttitle">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Online Grocery Delivery App"
                required
              />
            </div>

            {/* Business Category */}
            <div className="businesscategory">
              <label>Business Category *</label>
              <select name="business_category" required>
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
                      name="development_type[]"
                      value={type}
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
                    <input type="checkbox" name="features[]" value={feature} />{" "}
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* Expected Budget */}
            <div className="expectedbudget">
              <label>Expected Budget (Optional)</label>
              <select name="budget_range">
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
              <select name="timeline">
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
                placeholder="e.g., swiggy.com, wix.com"
                rows="2"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="fileupload">
              <label>Upload Files (Mockups, Docs, etc.)</label>
              <input
                type="file"
                name="project_files[]"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
              />
            </div>

            {/* Additional Notes */}
            <div className="additionalnotes">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                placeholder="Any other instructions or information..."
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit Requirement</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProject;
