import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function AddEvent() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    description:"",
    location: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    setError("")

    if (!isSignedIn || !user) {
      setError("You must be signed in to add an event.");
      return;
    }

    // Basic validation
    if (!eventData.title || !eventData.date || !eventData.time || !eventData.duration || !eventData.location) {
      setError("All fields are required!");
      return;
    }

    try {
      const eventPayload = {
        ...eventData,
        createdUserEmail: user.emailAddresses[0].emailAddress,
      };

      let res = await axios.post("http://localhost:5000/event-api/add-event", eventPayload);
      
      if (res.data.message === "Event Added Successfully" || res.data.message === "Event Already Present") {
        navigate("/events");
      } else {
        setError("Failed to add event");
      }
      console.log(res.data.message)
    } catch (err) {
      console.error("Error adding event:", err);
      setError("Server error, try again later.");
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">📝 Add New Event</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-primary">
        <div className="mb-3">
          <label className="form-label">Event Title:</label>
          <input type="text" className="form-control" name="title" value={eventData.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input type="date" className="form-control" name="date" value={eventData.date} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Time:</label>
          <input type="time" className="form-control" name="time" value={eventData.time} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (in hours):</label>
          <input type="number" className="form-control" name="duration" value={eventData.duration} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input type="text" className="form-control" name="location" value={eventData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
  <label className="form-label">Description:</label>
  <textarea
    className="form-control"
    name="description"
    value={eventData.description}
    onChange={handleChange}
    rows="4"
  ></textarea>
</div>


        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100" disabled={!isSignedIn}>
            {isSignedIn ? "Submit Event" : "Sign in to Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
