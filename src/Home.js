import { Link } from "react-router-dom";


const Home = () => {
  return (
    <nav className="navbar">
      <h2>Parcel app</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/service">Services</Link>
      </div>
    </nav>

    

    
  );
};

export default Home;
