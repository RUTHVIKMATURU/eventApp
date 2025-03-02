import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  async function getAllEvents() {
    try {
      let res = await axios.get("http://localhost:5000/event-api/events");
      if (res.data.message === "Events List") {
        setEvents(res.data.payload);
      } else {
        console.log("No Upcoming Events");
      }
    } catch (err) {
      console.log("Error in getting events:", err);
    }
  }

  function gotoEventById(event) {
    navigate(`/event/${event._id}`, { state: event });
  }

  function gotoAddEvent() {
    navigate("/add-event");
  }

  function gotoUpdateEvent(event) {
    navigate(`/update-event/${event._id}`, { state: event });
  }

  async function deleteEvent(eventId) {
    try {
      await axios.delete(`http://localhost:5000/event-api/events/${eventId}`);
      getAllEvents();
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (isSignedIn === false) {
      navigate("/login");
    }
  }, [isSignedIn]);

  return (
    <div className="container my-5">
      {isSignedIn && (
        <div>
          <h2 className="text-center text-primary mb-4">📅 Upcoming Events</h2>
          
          {/* Show Add Event button only for event managers */}
          {userRole === "eventmanager" && (
            <div className="text-center mb-3">
              <button className="btn btn-success" onClick={gotoAddEvent}>
                Add Event
              </button>
            </div>
          )}

          {events.length !== 0 ? (
            <div className="row">
              {events.map((event) => (
                <div key={event._id} className="col-md-4 mb-4">
                  <div className="card shadow-sm border-info rounded-3 h-100">
                    <div className="card-body">
                      <h4 className="card-title text-primary">{event.title}</h4>
                      <p className="card-text">
                        <b>📅 Date:</b> {event.date?.substring(0, 10)}
                      </p>
                      <p className="card-text">
                        <b>⏰ Time:</b> {event.time}
                      </p>
                      <p className="card-text">
                        <b>⌛ Duration:</b> {event.duration} hrs
                      </p>
                      <p className="card-text">
                        <b>📍 Location:</b> {event.location}
                      </p>
                      <button
                        className="btn btn-info text-light w-100 mt-2"
                        onClick={() => gotoEventById(event)}
                      >
                        Read More
                      </button>
                      {userRole === "eventmanager" && (
                        <div className="mt-3 d-flex justify-content-between">
                          <button
                            className="btn btn-warning"
                            onClick={() => gotoUpdateEvent(event)}
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
      )}
    </div>
  );
}

export default ViewEvents;
