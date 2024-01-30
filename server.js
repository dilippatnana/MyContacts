const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandle } = require("./middleware/errorHandle");
const connectDb = require("./config/dbconnection");

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandle);

app.listen( port, ()=>{ 
    console.log(`Server running on port ${port}`);
});