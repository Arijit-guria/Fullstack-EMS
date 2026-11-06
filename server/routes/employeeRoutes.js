import {Router} from "express";
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
const employeeRouter=Router();


employeeRouter.get("/",protect,protectAdmin, getEmployees)
employeeRouter.post("/",protect,protectAdmin,createEmployees)
employeeRouter.put("/",protect,protectAdmin,updateEmployees)
employeeRouter.delete("/",protect,protectAdmin,deleteEmployees)
export default employeeRouter;