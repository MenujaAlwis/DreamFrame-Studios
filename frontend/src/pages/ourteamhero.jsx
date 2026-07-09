import './ourteamhero.css';
import bg from '../assets/ourteamhero1.png';

const team = [
  {
    name: "Emma Williams",
    role: "Lead Photographer",
    position: {
      top: "35%",
      left: "17%"
    }
  },
  {
    name: "Sarah Johnson",
    role: "Assistant Photographer",
    position: {
      top: "58%",
      left: "32%"
    }
  },
  {
    name: "David Brown",
    role: "Studio Manager",
    position: {
      top: "40%",
      left: "42%"
    }
  },
  {
    name: "Sophia Miller",
    role: "Creative Director",
    position: {
      top: "42%",
      left: "52%"
    }
  },
  {
    name: "Mia Patinson",
    role: "Sales Associate",
    position: {
      top: "35%",
      left: "68%"
    }
  },
  {
    name: "James Wilson",
    role: "Videographer",
    position: {
      top: "58%",
      left: "80%"
    }
  },
  {
    name: "Olivia Smith",
    role: "Photo Editor",
    position: {
      top: "40%",
      left: "85%"
    }
  }
];

const OurTeamHero = () => {
  return (
    <div
      className="ourteam-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="ourteam-hero-content">
        <h1 className="ourteam-title">
          Behind the lens
        </h1>
      </div>


      {
        team.map((person,index)=>(
          <div
            key={index}
            className="person-hotspot"
            style={{
              top: person.position.top,
              left: person.position.left
            }}
          >

            <div className="person-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>

          </div>
        ))
      }


    </div>
  );
};

export default OurTeamHero;