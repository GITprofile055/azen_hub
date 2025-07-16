import React from "react";

const Refer = () => {
  return (
    <div className="uni-body pages-user-invite">
      <header>
        <h1>Referral</h1>
        {/* Round Settings Icon SVG can go here if needed */}
      </header>

      <section style={{ padding: "1.5rem" }}>
        {/* Invite Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #f1ff34, #64ce0c)",
            borderRadius: "1rem",
            padding: "1.2rem",
            textAlign: "center",
            marginBottom: "1.2rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000" }}>
            Invite Friends !
          </h2>
          <p style={{ fontSize: "0.85rem", margin: "0.5rem 0 1rem" }}>
            Enjoy Exclusive Rewards Together !
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
            alt="Gift Box"
            width="80"
            style={{ marginBottom: "1rem" }}
          />

          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "1rem",
              textAlign: "left",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <strong>5000 $XaZen</strong>
              <br />
              <small style={{ color: "#666" }}>
                Invitee Sign-up, Both earn rewards
              </small>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>1200 O₂</strong>
              <br />
              <small style={{ color: "#666" }}>
                Invitee Links DePIN 600O₂ <br />
                Invitee Links X 600O₂
              </small>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>10 O₂</strong>
              <br />
              <small style={{ color: "#666" }}>
                Earnings from Invitees’ Tasks
              </small>
            </div>

            <button
              style={{
                width: "100%",
                background: "#000",
                color: "#fff",
                padding: "0.75rem",
                fontWeight: 600,
                border: "none",
                borderRadius: "9999px",
                fontSize: "0.95rem",
              }}
            >
              Invite Friends
            </button>
          </div>
        </div>

        {/* Invited Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #b8fe3f)",
            padding: "1rem 1.2rem",
            borderRadius: "1rem",
            marginBottom: "1.2rem",
            boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              width="22"
              alt="User icon"
            />
            <span style={{ fontWeight: 600 }}>Invited</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>123456</span>
        </div>

        {/* Referral Rewards */}
        <div
          style={{
            background: "#BAFF2C",
            padding: "1.2rem",
            borderRadius: "1rem",
            marginBottom: "1.2rem",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Referral Rewards
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              padding: "1rem",
              borderRadius: "1rem",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9378/9378390.png"
                width="24"
                alt="O2 icon"
              />
              <span style={{ fontWeight: 700 }}>160.825</span>
            </div>
            <div style={{ fontSize: "0.9rem", color: "#888" }}>O₂</div>
            <div style={{ fontWeight: 700 }}>160.825</div>
          </div>
        </div>

        {/* Referral User Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1rem",
            padding: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.8rem",
            }}
          >
            <strong>Ella</strong>
            <span
              style={{
                fontSize: "0.8rem",
                background: "#ccc",
                padding: "0.2rem 0.5rem",
                borderRadius: "1rem",
              }}
            >
              DM
            </span>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span>🔗 Link X</span>
            <span>🔗 Link DePIN</span>
            <span>🟢 Today Active</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Refer;
