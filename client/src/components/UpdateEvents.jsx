import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function UpdateEvents() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state || {};

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (eventData) {
      setValue("title", eventData.title || "");
      setValue("date", eventData.date ? eventData.date.substring(0, 10) : "");
      setValue("time", eventData.time || "");
      setValue("duration", eventData.duration || "");
      setValue("location", eventData.location || "");
      setValue("description", eventData.description || "");
    }
  }, [eventData, setValue]);

  async function onSubmit(updatedEvent) {
    try {
      await axios.put(`http://localhost:5000/event-api/events/${eventData._id}`, updatedEvent);
      navigate("/events");
    } catch (err) {
      console.log("Error updating event:", err);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">✏️ Update Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Event Title</label>
          <input type="text" className="form-control" {...register("title", { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" {...register("date", { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input type="time" className="form-control" {...register("time", { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input type="text" className="form-control" {...register("duration", { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" {...register("location", { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" {...register("description", { required: true })}></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/events")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEvents;
