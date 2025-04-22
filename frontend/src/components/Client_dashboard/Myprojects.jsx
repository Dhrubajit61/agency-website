import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Myprojects.css"; // ⬅️ Custom CSS file

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const apiUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/myprojects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projectData = response.data.projectlists.map((project) => ({
          ...project,
          development_type: parseDevelopmentType(project.development_type),
        }));

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        navigate("/login");
      }
    };

    fetchProjects();
  }, []);

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
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      {projects.length === 0 ? (
        <p className="no-projects">No projects found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Development Types</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.business_category}</td>
                  <td>{project.description}</td>
                  <td>{project.development_type.join(", ")}</td>
                  <td>{new Date(project.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
