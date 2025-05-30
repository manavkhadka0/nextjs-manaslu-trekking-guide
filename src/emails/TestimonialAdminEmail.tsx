export function TestimonialAdminEmail({
  name,
  email,
  quote,
  rating,
  designation,
  location,
  trekRoute,
  trekDate,
  submissionDate,
}: any) {
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
      <h2 style={{ color: "#1e293b" }}>🌟 New Testimonial Received!</h2>
      <p style={{ fontSize: 16 }}>
        <strong>Name:</strong> {name}
        <br />
        <strong>Email:</strong> {email}
        <br />
        {designation && (
          <>
            <strong>Profession:</strong> {designation}
            <br />
          </>
        )}
        {location && (
          <>
            <strong>Location:</strong> {location}
            <br />
          </>
        )}
        {trekRoute && (
          <>
            <strong>Trek Route:</strong> {trekRoute}
            <br />
          </>
        )}
        {trekDate && (
          <>
            <strong>Trek Date:</strong>{" "}
            {typeof trekDate === "string"
              ? trekDate
              : trekDate?.toLocaleDateString()}
            <br />
          </>
        )}
        <strong>Submitted:</strong>{" "}
        {submissionDate ? new Date(submissionDate).toLocaleString() : ""}
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
          <strong>Rating:</strong>{" "}
          <span style={{ color: "#fbbf24", fontSize: 20 }}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
        </p>
      </div>
      <p style={{ color: "#64748b", fontSize: 14 }}>
        Please review and publish this testimonial in the admin dashboard.
      </p>
    </div>
  );
}
