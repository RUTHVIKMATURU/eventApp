import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
function EventById() {
  const { state } = useLocation();
  const navigate=useNavigate();
  return (
    <div className="container my-5">
      {/* Event Header */}
      <div className="card bg-dark text-light shadow-lg border-0 rounded-3">
        <div className="card-body">
          <h1 className="text-center fw-bold">{state.title}</h1>
          <div className="d-flex flex-wrap justify-content-between mt-3">
            <p className="text-warning mb-2">
              <b className="text-light">📅 Date:</b> {state.date}
            </p>
            <p className="text-warning mb-2">
              <b className="text-light">⏰ Time:</b> {state.time}
            </p>
            <p className="text-warning mb-2">
              <b className="text-light">📍 Location:</b> {state.location}
            </p>
          </div>
          <hr className="border-light opacity-50" />
          <div className="d-flex flex-wrap justify-content-between">
            <p className="text-light mb-0">
              <b>👤 Created By:</b> {state.createdUserEmail}
            </p>
            <p className="text-light mb-0">
              <b>📌 Created On:</b> {state.createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Event Description */}
      <div className="card mt-4 shadow border-info rounded-3">
        <div className="card-body bg-light">
          <h5 className="card-title fw-bold">📝 Event Details</h5>
          <p className="card-text text-muted">{state.description}</p>
        </div>
      </div>
      <button className="btn btn-info mt-2" onClick={()=>{navigate("/events")}}>Back to Events</button>
    </div>
  );
}

export default EventById;
