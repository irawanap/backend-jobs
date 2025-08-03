const prisma = require("../model/prisma")

/**
 * Creates a new job entry in the database.
 * @param {object} jobData - The data for the new job, including userId.
 * @returns {Promise<object>} The newly created job object.
 */
exports.createJob = async (jobData) => {
  return await prisma.job.create({
    data: jobData,
  })
}

/**
 * Retrieves all jobs for a specific user.
 * @param {string} userId - The ID of the user whose jobs are to be retrieved.
 * @returns {Promise<Array<object>>} An array of job objects.
 */
exports.getAllJobs = async (userId) => {
    return await prisma.job.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
}

/**
 * Retrieves a single job by its ID for a specific user.
 * @param {number} jobId - The ID of the job to retrieve.
 * @param {string} userId - The ID of the user who owns the job.
 * @returns {Promise<object | null>} The job object if found, otherwise null.
 */
exports.getJobById = async (jobId, userId) => {
    return await prisma.job.findUnique({
        where: {
            id: jobId,
            userId: userId, 
        },
    })
}

/**
 * Updates an existing job for a specific user.
 * @param {number} jobId - The ID of the job to update.
 * @param {string} userId - The ID of the user who owns the job.
 * @param {object} updateData - The data to update the job with.
 * @returns {Promise<object>} The updated job object.
 * @throws {Error} If the job is not found or does not belong to the user.
 */
exports.updateJob = async (jobId, userId, updateData) => {

    return await prisma.job.update({
        where: {
            id: jobId,
            userId: userId,
        },
        data: updateData,
    })
}

/**
 * Deletes a job for a specific user.
 * @param {number} jobId - The ID of the job to delete.
 * @param {string} userId - The ID of the user who owns the job.
 * @returns {Promise<object>} The deleted job object.
 * @throws {Error} If the job is not found or does not belong to the user.
 */
exports.deleteJob = async (jobId, userId) => {

    return await prisma.job.delete({
        where: {
            id: jobId,
            userId: userId,
        },
    })
}

