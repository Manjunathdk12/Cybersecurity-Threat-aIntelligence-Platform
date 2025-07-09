const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const modelPath = path.join(__dirname, "..", "model_pipeline.pkl");

// Load Python shell to run model
router.post("/", async (req, res) => {
    const description = req.body.description;

    if (!description) {
        return res.status(400).json({ error: "Description is required" });
    }

    // Spawn a Python process
    const py = spawn("python3", ["predict.py", modelPath,description]);

    let result = "";
    py.stdout.on("data", (data) => {
        result += data.toString();
    });

    py.stderr.on("data", (data) => {
        console.error("Python error:", data.toString());
    });

    py.on("close", () => {
    try {
        const trimmed = result.trim();
        console.log("Python output:", trimmed);
        const prediction = JSON.parse(trimmed);
        res.json(prediction);
    } catch (err) {
        console.error("JSON Parse Error:", err.message);
        res.status(500).json({ error: "Prediction failed" });
    }
});

});

module.exports = router;
