const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String },
  salary: { type: Number },
  hire_date: { type: Date }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;