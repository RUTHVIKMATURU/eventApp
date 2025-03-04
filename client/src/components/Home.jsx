import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleRoleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (!isLoaded || !user) {
      setError("User data is loading. Please wait.");
      return;
    }
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      setError("Email not found. Please try again.");
      return;
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: userEmail,
      profileImageUrl: user.imageUrl,
      role: role,
    };

    try {
      const res = await axios.post("http://localhost:5000/user-api/user", userData);
      
      if (res.status === 201 || (res.status === 200 && res.data.message === userData.role)) {
        localStorage.setItem("userRole", role);
        navigate("/events");
      } else {
        setError(res.data.message || "Unexpected error. Please try again.");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Invalid Role");
    }
  }
  return (
    <div className="container mt-4">
      {!isLoaded ? (
        <p className="text-center text-muted">Loading...</p>
      ) : isSignedIn === false ? (
        
      <div>
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Welcome to Event Manager 🎉</h1>
      <p className="text-xl max-w-3xl opacity-100 ">
        Effortless event planning at your fingertips! Whether it's a corporate gathering, wedding, or casual get-together, we provide a seamless way to organize, manage, and enjoy every moment of your special events.
      </p>
      <p className="text-xl max-w-3xl opacity-100  mt-4">
        Our platform offers a stress-free approach to event management, ensuring smooth coordination from start to finish. Easily handle guest lists, send invites, and track RSVPs in real-time. With intuitive tools, you can focus on making memories while we take care of the logistics.
      </p>
      <p className="text-xl max-w-3xl opacity-100  mt-4">
        Stay ahead with customized schedules, automated reminders, and budget tracking to make sure everything runs seamlessly. No matter the size of your event, Event Manager provides all the tools you need to create unforgettable experiences.
      </p>
        <p className="text-lg">
          Whether you're planning an intimate gathering or a large-scale event, our platform empowers you with tools to stay organized. From venue selection to final execution, we make every step effortless, ensuring you can focus on creating unforgettable moments.
        </p>
        <p className="text-lg mt-4">
          Join thousands of event planners and hosts who trust us to simplify their event management. Experience seamless coordination, instant updates, and stress-free planning with Event Manager today!
        </p>
        <button className="btn btn-dark text-light" onClick={()=>{navigate("/login")}}>Get Started</button>
      </div>
      
      ) : (
        <div>
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <img
                src={user?.imageUrl}
                alt="User"
                width="80"
                height="80"
                className="rounded-circle border border-3"
              />
              <h4 className="mt-3">{user?.firstName} {user?.lastName}</h4>
              <p className="text-muted">{user?.emailAddresses[0]?.emailAddress || "No email available"}</p>
            </div>
          </div>
          <div className="card bg-light mt-4 shadow">
            <div className="card-body">
              <h3 className="text-center text-primary">Select Your Role</h3>
              
              {error && <div className="alert alert-danger text-center">{error}</div>}

              <form className="d-flex justify-content-center gap-4 p-3" onSubmit={handleRoleSubmit}>
                <div className="form-check">
                  <input
                    type="radio"
                    id="userRole"
                    name="role"
                    value="user"
                    className="form-check-input"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="userRole" className="form-check-label fw-bold lead">User</label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    id="eventManagerRole"
                    name="role"
                    value="eventmanager"
                    className="form-check-input"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="eventManagerRole" className="form-check-label fw-bold lead">Event Manager</label>
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
