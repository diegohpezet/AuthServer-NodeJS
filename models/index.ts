import database from "../config/database";
import userModel from "./user.model";

database.sync()
  .then(() => console.log("Database synced"))
  .catch((error) => console.log(error));

export { userModel };