import { useEffect, useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "ChronoView — Home";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setMessage("Adding user...");

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password_hash: password,     // backend expects "password_hash"
          display_name: displayName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ User added: ${data.email}`);
        setEmail("");
        setPassword("");
        setDisplayName("");
      } else {
        setMessage(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error");
    }
  };

  return (
    <div className="page">
      <h1>Welcome to ChronoView</h1>
      <p>Add a new user to the database:</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
