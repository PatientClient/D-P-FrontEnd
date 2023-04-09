import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import useApiRequest from "../../../hooks/useApiRequest";
import { Toast } from "primereact/toast";
import { calculateNewRating } from "../../../utils/calcRating";

function AddFeedback({ userId, activityId, activity, onAdd }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const { request: request } = useApiRequest();
  const toast = useRef(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Add code to submit the feedback to the backend
    const res = await request(`/activities/${activityId}/feedback`, 'POST', { createdBy: userId, description: comment, rate: rating })
    if (!res || res.error) {
      toast.current.show({ severity: 'error', summary: 'rejected', detail: `${res.error.message}` || `failed to add  `, life: 3000 });
      return
    }
    const totalRated = activity.feedback.filter(item => item.rate > 0).length;
    const newRate = calculateNewRating(totalRated, rating, activity.rate)
    console.log("newRateBeforSubmitted", newRate);
    const activityAfterUpdate = await request(`/activities/${activityId}`, 'PATCH', { rate: newRate })
    console.log(activityAfterUpdate);
    onAdd()
    toast.current.show({ severity: 'added', summary: 'success', detail: `added successfuly`, life: 3000 });
  };

  return (
    <div className="p-card p-p-2 p-rounded-10">
      <form onSubmit={handleSubmit}>
        <div className="p-field p-my-2">
          <label htmlFor="rating">Rating</label>
          <Rating
            id="rating"
            value={rating}
            cancel={false}
            onChange={(e) => setRating(e.value)}
          />
        </div>
        <div className="p-field p-my-2">
          <label htmlFor="comment">Comment</label>
          <InputTextarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
        <Button type="submit" label="Submit" className="p-mt-2" />
      </form>
      <Toast ref={toast} />
    </div>
  );
}

export default AddFeedback;
