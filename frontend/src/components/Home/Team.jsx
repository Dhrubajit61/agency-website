import "../../assets/css/Team.css";
import member1 from "../../assets/files/Team/team-1.jpg";
import member2 from "../../assets/files/Team/team-2.jpg";
import member3 from "../../assets/files/Team/team-3.jpg";
import member4 from "../../assets/files/Team/team-4.jpg";

const Team = () => {
  return (
    <section id="teams">
      <div className="teams-container container">
        <div className="teams-title">
          <h1>Our expert Team</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt labore.
          </p>
        </div>
        <div className="team-members">
          <div className="team">
            <img src={member1} alt="" />
            <h1>Dhrubajit Das</h1>
            <p>CEO, MD</p>
          </div>
          <div className="team">
            <img src={member2} alt="" />
            <h1>Jonathon</h1>
            <p>Frontend Developer</p>
          </div>
          <div className="team">
            <img src={member3} alt="" />
            <h1>Lolzzz</h1>
            <p>Gamer</p>
          </div>
          <div className="team">
            <img src={member4} alt="" />
            <h1>Mayur Gaming</h1>
            <p>Noob Player</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Team;
