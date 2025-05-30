import React from "react";

export function TestimonialThankYouEmail({ name, quote, rating }: any) {
  return (
    <div
      style={{
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "#f9fafb",
        padding: 32,
        borderRadius: 12,
        color: "#222",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h2 style={{ color: "#16a34a" }}>
        Thank You for Your Testimonial, {name}!
      </h2>
      <p style={{ fontSize: 16 }}>
        We truly appreciate you taking the time to share your experience with
        Manaslu Trekking Guide.
      </p>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          margin: "24px 0",
          border: "1px solid #e5e7eb",
        }}
      >
        <p style={{ fontSize: 18, fontStyle: "italic", color: "#334155" }}>
          “{quote}”
        </p>
        <p style={{ marginTop: 16 }}>
          <strong>Your Rating:</strong>{" "}
          <span style={{ color: "#fbbf24", fontSize: 20 }}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
        </p>
      </div>
      <p style={{ fontSize: 16 }}>
        Your feedback helps future trekkers and inspires us to keep improving
        our services.
        <br />
        <br />
        <strong>Safe travels and hope to see you again!</strong>
      </p>
      <p style={{ color: "#64748b", fontSize: 14, marginTop: 32 }}>
        — The Manaslu Trekking Guide Team
      </p>
    </div>
  );
}
