const express = require("express");
const router = express.Router();
const { getAllJobs, createJob, getJobById, updateJob, deleteJob } = require("../controllers/job.controller");
const { validate } = require("../middlewares/validation.middleware");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, getAllJobs);
router.get('/:id', protect, getJobById);
router.post("/create", protect, ...validate("createJob"), createJob);
router.put("/:id", protect, ...validate("updateJob"), updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
