//Get employees

import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js"

//GET /api/employees
export const getEmployees=async(req,res)=>{
    try {
        const {department}=req.query
        const where={};
        if(department) where.department=department;
        const employees=await Employee.find(where).sort({createdAt:-1}).populate("userId","email role").lean();
        const result=employees.map((emp)=>({
            ...emp,
            id:emp._id.toString(),
            employmentStatus:emp.employmentStatus || emp.employeeStatus || "ACTIVE",
            employeeStatus:emp.employeeStatus || emp.employmentStatus || "ACTIVE",
            user:emp.userId?{email:emp.userId.email,role:emp.userId.role}:null
        }))
        return res.json(result)
    } catch (error) {
        return res.status(500).json({error:"Failed to fetch employees"})
        
    }

}
//create employee
//P0ST /API/EMPLOYEE
export const createEmployees=async(req,res)=>{
    try {
        const {firstName,lastName,email,phone,position,department,basicSalary,allowences,deductions,joinDate,temporaryPassword:password,role,bio}=req.body;
        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({error:"Missing required fields"});
        }
        const hashed=await bcrypt.hash(password,10)
        const user=await User.create({
            email,
            password:hashed,
            role:role || "EMPLOYEE"
        })
        const status=req.body.employmentStatus || req.body.employeeStatus || "ACTIVE";
        const allowancesValue=Number(req.body.allowances ?? req.body.allowences ?? 0);
        const employee=await Employee.create({
            userId:user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            department:department || "Engineering",
            basicSalary:Number(basicSalary) || 0,
            allowances:allowancesValue,
            allowences:allowancesValue,
            deductions:Number(deductions) || 0,
            employmentStatus:status,
            employeeStatus:status,
            joinDate:new Date(joinDate),
            bio:bio || "",
        })
        return res.status(201).json({success:true,employee})
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({error:"Email already exists"})
        }
        console.error("create employee error",error)
        return res.status(500).json({error:"Failed to create employee"})
    }

}
//update employee
//PUT /API/EMPLOYEE/:ID
export const updateEmployees=async(req,res)=>{
     try {
        const {id}=req.params;
        const {firstName,lastName,email,phone,position,department,basicSalary,deductions,password,role,bio}=req.body;
        const status=req.body.employmentStatus || req.body.employeeStatus || "ACTIVE";
        const allowancesValue=Number(req.body.allowances ?? req.body.allowences ?? 0);
        const employee=await Employee.findById(id);
        if(!employee) return res.status(404).json({error:"Employee not found"})
        
        await Employee.findByIdAndUpdate(id,{
            firstName,
            lastName,
            email,
            phone,
            position,
            department:department || "Engineering",
            basicSalary:Number(basicSalary) || 0,
            allowances:allowancesValue,
            allowences:allowancesValue,
            deductions:Number(deductions) || 0,
            employmentStatus:status,
            employeeStatus:status,
            bio:bio || "",
        })
        //update user record
        const userUpdate={email}
        if(role)userUpdate.role=role;
        if(password) userUpdate.password=await bcrypt.hash(password,10);
        await User.findByIdAndUpdate(employee.userId,userUpdate)

        return res.status(201).json({success:true})
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({error:"Email already exists"})
        }
        
        return res.status(500).json({error:"Failed to update employee"})
    }


}
//delete employee
//PUT /API/EMPLOYEE/:ID
export const deleteEmployees=async(req,res)=>{
    try {
        const {id}=req.params;
        const employee=await Employee.findById(id)
        if(!employee)return res.status(404).json({error:"Employee not found"});
        employee.isDeleted=true;
        employee.employmentStatus="INACTIVE"
        employee.employeeStatus="INACTIVE"
        await employee.save()
        return res.json({success:true})
    } catch (error) {
        return res.status(500).json({error:"Failed to delete employee"});
    }

}
