import mongoose from "mongoose";
const leaveApplicationSchema=new mongoose.Schema({
employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
type:{type:String,enum:["SICK","CASUAL","ANNUAL"],required:true},
startDate:{type:date,required:true},
endDate:{type:date,required:true},
reason:{type:String,required:true},
status:{type:String,enum:["PENDING","APPROVED","REJECTED"],default:"PENDING"},



},{timestamps:true})
const LeaveApplication=mongoose.models.LeaveApplication || mongoose.model("LeaveApplication",leaveApplicationSchema);
export default LeaveApplication;
