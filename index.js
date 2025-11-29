import fetch from "node-fetch";
import express from "express";

const app = express();
app.use(express.json());

app.post("/rpc", async (req, res) => {
  try {
    const response = await fetch("https://immutable-zkevm.drpc.org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy Error", details: err.toString() });
  }
});

app.listen(3000, () => console.log("RPC proxy running on port 3000"));
