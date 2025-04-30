import { Responsecontext, Usercontext } from "../Home/Contextapi";
import { useState, useEffect, useContext } from "react";
import "../../assets/css/DashboardHome.css";
import { OpenLoginModalContext } from "../Home/Contextapi";
import { Messagecontext } from "../Home/Contextapi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardHome = () => {
  const { user, setUser } = useContext(Usercontext);

  const { message, setMessage } = useContext(Messagecontext);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  );
  const [loading, setLoading] = useState(true);
  const { response, setResponse } = useContext(Responsecontext);
  const [projects, setProjects] = useState([
    // {
    //   id: -1,
    //   development_type: [null],
    // },
  ]);
  const apiUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        setIsLoginModalOpen(true);
        setMessage("You have been logged out");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/myprojects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // const projectData = response.data.projectlists.map((project) => ({
        //   ...project,
        //   development_type: parseDevelopmentType(project.development_type),
        // }));

        // setProjects(projectData);
        console.log(response.data.projectlists);
        setResponse(response.data.projectlists);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoginModalOpen(true);
        setMessage("You have been logged out2");
        navigate("/");
      } finally {
        setLoading(false); // This runs in both success and error
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <>
      {user && (
        <div>
          <div style={{ margin: "5px" }}>
            <h3>Welcome! {user.user.name}</h3>
          </div>
          <div className="Dashboard-cards">
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n1">
                  {loading ? (
                    <p>Fetching...</p>
                  ) : (
                    <p>{response?.length ?? 0}</p>
                  )}
                </div>
                <p>Total Requirements Submitted </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n2">
                  {loading ? (
                    <p>Fetching...</p>
                  ) : (
                    <p>{response?.length ?? 0}</p>
                  )}
                </div>
                <p>Active Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n3">
                  {loading ? (
                    <p>Fetching...</p>
                  ) : (
                    <p>{response?.length ?? 0}</p>
                  )}
                </div>
                <p>Completed Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n4">
                  {loading ? (
                    <p>Fetching...</p>
                  ) : (
                    <p>{response?.length ?? 0}</p>
                  )}
                </div>
                <p>Unread Messages </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DashboardHome;
