```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://shopping-website-2ytp.onrender.com/api";

function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `${API}/reviews/${productId}`
      );

      setReviews(data.reviews || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        `${API}/reviews`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added Successfully");

      setComment("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to submit review"
      );
    }
  };

  const average =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        marginTop: "40px",
        borderTop: "1px solid #ddd",
        paddingTop: "20px",
      }}
    >
      <h2>⭐ Product Reviews</h2>

      <h3>
        Average Rating : {average} ⭐
      </h3>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
        }}
      >
        <option value={5}>★★★★★</option>
        <option value={4}>★★★★☆</option>
        <option value={3}>★★★☆☆</option>
        <option value={2}>★★☆☆☆</option>
        <option value={1}>★☆☆☆☆</option>
      </select>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        style={{
          width: "100%",
          height: "120px",
          marginTop: "15px",
          padding: "10px",
        }}
      />

      <button
        onClick={submitReview}
        style={{
          marginTop: "15px",
          padding: "12px 30px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>

      <hr />

      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>{review.user?.name}</h3>

          <p>
            {"⭐".repeat(review.rating)}
          </p>

          <p>{review.comment}</p>

          <small>
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Review;
```
