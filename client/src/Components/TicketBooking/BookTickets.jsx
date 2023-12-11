import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BookTickets = () => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = async () => {
    try {
      // Call your backend API to handle the booking logic
      // For simplicity, assume that you have an endpoint "/api/bookings" to handle bookings
      const response = await axios.post("/api/bookings", {
        showtime: "your_selected_showtime", // Replace with the actual showtime
        // Include other necessary data such as movieId and userId
      });

      // If the booking is successful, update the state to reflect the change
      if (response.status === 200) {
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon
        icon={faTicket}
        className={`text-4xl cursor-pointer ${
          isBooked ? "text-red-500" : "text-green-500"
        }`}
        onClick={handleBooking}
      />
      <p className="text-xl">{isBooked ? "Booked" : "Not Booked"}</p>
    </div>
  );
};

export default BookTickets;
