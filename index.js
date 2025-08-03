const app = require("./server") // Import the Express app instance
const PORT = process.env.PORT || 3000

// Start the server only when this file is executed directly
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
