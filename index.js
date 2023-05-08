import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import { dbConnection } from "./database/db.js"
import { repoRoutes } from "./routes/repoRoutes.js"
import { signUpRoute } from "./routes/signUpRoute.js"
import { logInRoutes } from "./routes/loginRoute.js"

//env configuration
dotenv.config()

//Database connection
dbConnection()

const app = express()

app.get('/', (req,res) => {
    res.send("VCS Server Up And Running Successfully")
})

app.use(cors());

app.use(express.json())
const corsOptions={
    origin:'*',
    Credentials:true,
    optionSuccessStatus:200,
}

app.use("/",repoRoutes);
app.use("/signUp",signUpRoute);
app.use("/logIn",logInRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT)
})