const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');

// Add new employee
router.post('/api/employees', async (req, res) => {
  const employeeData = req.body;

  try {
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add employee', error });
  }
});

// Get employees, optionally filtered by department
router.get('/api/employees', async (req, res) => {
  const { department } = req.query;

  try {
    const employees = await Employee.find(department ? { department } : {});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get employees sorted by salary
router.get('/api/employees/sort', async (req, res) => {
  const { order = 'asc' } = req.query;

  try {
    const employees = await Employee.find().sort({ salary: order === 'asc' ? 1 : -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get employee by ID
router.get('/api/employees/:employee_id', async (req, res) => {
  const { employee_id } = req.params;

  try {
    const employee = await Employee.findOne({ employee_id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
