import app from "./app.js";
import connectDB from "./database/db.js";
const port = process.env.PORT || 7000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
