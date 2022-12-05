import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import express, { Request, Response } from "express";
import { ServerResponse } from "./shared/interceptors/serverResponse";
import { CtraficHttpStatusCode } from "./shared/constants/HTTPStatus";

//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// DataBase
import "./config/database";
import routes from "./routes/index";

// Routes
app.use("/api/auth", routes.authRoutes);
app.use("/api/user", routes.userRoutes);
app.use("/api/traveler", routes.trvelerRoutes);
app.use("/api/trafic", routes.traficRoutes);
app.use("/api/researchedPerson", routes.researchedPersonRoutes);
app.use("/api/researchedPersonHistory", routes.researchedPersonHistoryRoutes);

app.get("/", (req: Request, res: Response) => {
  try {
    return new ServerResponse(
      CtraficHttpStatusCode.OK,
      "Welcome to trafic-control project-backend | WIP",
      {},
      null
    ).sendResponse(res);
  } catch (error) {
    return new ServerResponse(
      CtraficHttpStatusCode.BAD_REQUEST,
      "something went wrong.",
      null,
      error
    ).sendResponse(res);
  }
});

//Server Listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
