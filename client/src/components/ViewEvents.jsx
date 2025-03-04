import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [loading, setLoading] = useState(true);

  async function getAllEvents() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/event-api/events");
      if (res.data.message === "Events List") {
        setEvents(res.data.payload);
        setAllEvents(res.data.payload);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      alert("Failed to fetch events. Please try again later.");
    }
    setLoading(false);
  }

  async function deleteEvent(eventId) {
    try {
      await axios.delete(`http://localhost:5000/event-api/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      setAllEvents(allEvents.filter(event => event._id !== eventId));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event. Please try again.");
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!searchTerm) {
        setEvents(allEvents);
      } else {
        const filtered = allEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.date.includes(searchTerm) ||
          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setEvents(filtered);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, allEvents]);

  useEffect(() => {
    if (isSignedIn) {
      getAllEvents();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">📅 Upcoming Events</h2>

      {userRole === "eventmanager" && (
        <div className="text-center mb-3">
          <button className="btn btn-success" onClick={() => navigate("/add-event")}>
            Add Event
          </button>
        </div>
      )}

      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by title, location, or date..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type="button" className="btn btn-secondary ms-2" onClick={() => setSearchTerm("")}>
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted fs-5">Loading events...</p>
      ) : events.length !== 0 ? (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-info rounded-3 h-100">
                <div className="card-body">
                  <h4 className="card-title text-primary">{event.title}</h4>
                  <p className="card-text"><b>📅 Date:</b> {event.date?.substring(0, 10)}</p>
                  <p className="card-text"><b>⏰ Time:</b> {event.time}</p>
                  <p className="card-text"><b>⌛ Duration:</b> {event.duration} hrs</p>
                  <p className="card-text"><b>📍 Location:</b> {event.location}</p>
                  <button
                    className="btn btn-info text-light w-100 mt-2"
                    onClick={() => navigate(`/event/${event._id}`, { state: event })}
                  >
                    Read More
                  </button>
                  {userRole === "eventmanager" && (
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/update-event/${event._id}`, { state: event })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted fs-5">No Upcoming Events</p>
      )}
    </div>
  );
}

export default ViewEvents;
