const jobService = require("../services/job.service");

const getAllJobs = async (req, res) => {
    try {
        const userId = req.user.id

        const jobs = await jobService.getAllJobs(userId);

        res.status(200).json({
            success: true,
            message: "Get All Jobs Successfully",
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error during fetching jobs",
        });
    }
};

const getJobById = async (req, res) => {
    const jobId = parseInt(req.params.id);
    const userId = req.user.id;

    const job = await jobService.getJobById(jobId, userId);
    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found.",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Job has been found.",
        data: job,
    })
};


const createJob = async (req, res) => {
    try {
        const userId = req.user.id;

        const { company, position, status, appliedDate, offerDate, jobType, source, resumeUrl, notes } = req.body;

        const jobDataToCreate = {
            userId,
            company,
            position,
            ...(status && { status }),
            ...(appliedDate && { appliedDate }),
            offerDate,
            jobType,
            source,
            resumeUrl,
            notes,
        };

        const newJob = await jobService.createJob(jobDataToCreate);

        res.status(201).json({
            success: true,
            message: "Job successfully inputted.",
            data: { 
                id: newJob.id,
                userId: newJob.userId,
                company: newJob.company,
                position: newJob.position,
                status: newJob.status,
                appliedDate: newJob.appliedDate,
                offerDate: newJob.offerDate,
                jobType: newJob.jobType,
                source: newJob.source,
                resumeUrl: newJob.resumeUrl,
                notes: newJob.notes,
                createdAt: newJob.createdAt,
                updatedAt: newJob.updatedAt,
            }
        });
    } catch (error) {
        console.error("Error during inputting data jobs", error)
        res.status(500).json({
            success: false,
            message: "Internal server error durring job creation."
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        const userId = req.user.id;
        const updateData = req.body;

        const updateJob = await jobService.updateJob(jobId, userId, updateData);

        return res.status(200).json({
            success: true,
            message: "Successfully updated job.",
            data: updateJob
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during updating job.",
            error: error.message,
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        const userId = req.user.id;

        await jobService.deleteJob(jobId, userId);

        return res.status(200).json({
            success: true,
            message: "Successfully deleted job."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during deleting job.",
            error: error.message,
        });
    }
}


module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
}

