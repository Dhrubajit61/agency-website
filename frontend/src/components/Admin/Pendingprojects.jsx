import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Myprojects.css"; // ⬅️ Custom CSS file
import loading_gif from "../../assets/files/loading_gif.gif";
import { OpenLoginModalContext } from "../Home/Contextapi";
import { Messagecontext } from "../Home/Contextapi";
import { Openmodal2context } from "../Home/Contextapi";
import checkmark from "../../assets/files/checkmark2.gif";

const MyProjects = () => {
  const { message, setMessage } = useContext(Messagecontext);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  );
  const { openmodal2context, setOpenmodal2context } =
    useContext(Openmodal2context);
  const apiUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [reloadProjects, setReloadProjects] = useState(false);
  const [response, setResponse] = useState(false);
  const [projectapproved, setProjectapproved] = useState(false);
  const [staff, setStaff] = useState([]);

  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      setOpenmodal2context(false);
    }
  };
  const handleCloseModal2 = () => {
    setOpenmodal2context(false);
    setProjectapproved(false);
    setStaff([]);
    setProjectinfo({ staffselection: "" });
  };

  const [projects, setProjects] = useState([
    {
      id: -1,
      development_type: [null],
    },
  ]);
  const [projectinfo, setProjectinfo] = useState({
    project_id: "",
    projectapproval: "",
    staffselection: "",
  });
  const handleChange = (e) => {
    setProjectinfo({
      ...projectinfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleclickme = async (projectid, approval) => {
    setOpenmodal2context(true);
    fetchstaffinfo();
    setProjectinfo((prev) => ({
      ...prev,
      project_id: projectid,
      projectapproval: approval,
    }));
  };
  const fetchstaffinfo = async () => {
    if (!token) {
      setIsLoginModalOpen(true);
      setMessage("You have been logged out");
      navigate("/");
      return;
    }
    try {
      const staffs = await axios.get(`${apiUrl}/api/staff-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(staffs);
      if (staffs.data.message === "true") {
        setStaff(staffs.data.staffs);
      }
    } catch (error) {
      console.error("Some error occured while fetching staff details" + error);
    } finally {
    }
  };

  useEffect(() => {
    console.log(projectinfo);
  }, [projectinfo]);
  const handleclickme2 = async () => {
    console.log("this is handleclickme2");
    console.log(projectinfo);
    try {
      const response = await axios.post(
        `${apiUrl}/api/adminaction`,
        projectinfo, // assuming you want to send project ID
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setResponse(response.data);
      // alert("Project approved successfully");
      setReloadProjects((prev) => !prev);
    } catch (error) {
      console.error("Error approving project:", error);
    } finally {
      setProjectapproved(true);
      setProjectinfo({
        project_id: "",
        projectapproval: "",
        staffselection: "",
      });
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        setIsLoginModalOpen(true);
        setMessage("You have been logged out");
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}/api/projectsforadmin`,
          { status: "pending" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectData = response.data.projects.map((project) => ({
          ...project,
          development_type: parseDevelopmentType(project.development_type),
        }));

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoginModalOpen(true);
        setMessage("You have been logged out");
        navigate("/");
      }
    };

    fetchProjects();
  }, [reloadProjects]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const parseDevelopmentType = (devType) => {
    try {
      const parsed = JSON.parse(devType);
      if (
        Array.isArray(parsed) &&
        parsed.length === 1 &&
        typeof parsed[0] === "string"
      ) {
        return JSON.parse(parsed[0]);
      }
      return parsed;
    } catch (e) {
      return [];
    }
  };

  return (
    <>
      <div className="projects-container">
        <h2 className="projects-title">Pending Projects List</h2>
        {projects.length == 0 ? (
          <p className="no-projects">Sorry no project found</p>
        ) : projects[0].id == -1 ? (
          <div className="no-projects">
            <p>Fetching projects wait... </p>
            <img src={loading_gif} alt="" />
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>User's Name</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Development Types</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <span
                        style={{
                          background: "#17a2b8",
                          color: "#fff",
                          padding: "6px",
                          borderRadius: "2px",
                        }}
                      >
                        {project.id}
                      </span>
                    </td>
                    <td>{project.user.name}</td>
                    <td>{project.title}</td>
                    <td>{project.business_category}</td>
                    <td>{project.description}</td>
                    <td>{project.development_type.join(", ")}</td>
                    <td>
                      {new Date(project.created_at).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span
                        style={{
                          background: "#007bff",
                          color: "#fff",
                          padding: "6px",
                          borderRadius: "4px",
                        }}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          justifyContent: "space-between",
                          gap: "5px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            background: "rgb(64 193 48)",
                            color: "#fff",
                            padding: "6px",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleclickme(project.id, "approve")}
                        >
                          Approve
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: "rgb(225 56 29)",
                          color: "#fff",
                          padding: "6px",
                          borderRadius: "4px",
                        }}
                        onClick={() => handleclickme(project.id, "reject")}
                      >
                        Reject
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {openmodal2context && (
        <div className="modal-overlay">
          <div className="modal checkmodal">
            <button className="close-button" onClick={handleCloseModal2}>
              &times;
            </button>

            {projectapproved ? (
              <div className="checkmark">
                <img src={checkmark} alt="Checkmark" />
                <h4>Success</h4>
                <p style={{ letterSpacing: "unset" }}>{response.message} </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "50px",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {projectinfo.projectapproval == "approve" ? (
                  <>
                    <h3>Please assign a staff to this project</h3>
                    <select
                      name="staffselection"
                      style={{ height: "25px" }}
                      onChange={handleChange}
                      value={projectinfo.staffselection}
                    >
                      <option value="">-- Choose a Staff --</option>
                      {staff.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name} ({staff.email})
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <h3>Please write a reason of rejection</h3>
                    <textarea
                      name=""
                      id=""
                      style={{ height: "70px", resize: "none" }}
                    ></textarea>
                  </>
                )}
                <div style={{ display: "flex" }}>
                  <button
                    onClick={handleCloseModal2}
                    style={{
                      width: "40%",
                      marginInline: "auto",
                      padding: "8px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleclickme2}
                    style={{
                      width: "40%",
                      marginInline: "auto",
                      padding: "8px",
                      backgroundColor: "#39a94c",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {projectinfo.projectapproval == "approve" ? (
                      <>Approve</>
                    ) : (
                      <>Reject</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyProjects;
