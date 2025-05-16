import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Myprojects.css"; // ⬅️ Custom CSS file
import loading_gif from "../../assets/files/loading_gif.gif";
import { OpenLoginModalContext } from "../Home/Contextapi";
import { Messagecontext } from "../Home/Contextapi";
import Modal2 from "./Modal2";
import { Openmodal2context } from "../Home/Contextapi";

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

  const [projects, setProjects] = useState([
    {
      id: -1,
      development_type: [null],
    },
  ]);
  const handleclickme = async (projectid, approval) => {
    console.log(projectid);
    setOpenmodal2context(true);

    // try {
    //   const response = await axios.post(
    //     `${apiUrl}/api/adminaction`,
    //     { status: "approved", project_id: projectid }, // assuming you want to send project ID
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   console.log(response);
    //   alert("Project approved successfully");
    //   setReloadProjects((prev) => !prev);
    // } catch (error) {
    //   console.error("Error approving project:", error);
    // }
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
      {openmodal2context && <Modal2></Modal2>}
    </>
  );
};

export default MyProjects;
