import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import AddEmployeeForm from '../components/AddEmployeeForm';

export default function Employees() {
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem("employees")) || []);
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    async function loadEmployees() {
        try {
            const response = await fetch('https://employee-spring-boot-production.up.railway.app/api/employees');
            const fetchEmployees = await response.json();
            localStorage.setItem("employees", JSON.stringify(fetchEmployees));
            setEmployees(fetchEmployees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    const editEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    const deleteEmployee = (employee) => {
        async function deleteEmpl() {
            try {
                await fetch(`https://employee-spring-boot-production.up.railway.app/api/employees/${employee.id}`, {
                    method: 'DELETE',
                });
                loadEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
        deleteEmpl();
    };

    return (
        <div>
            <Nav />
            {
                showForm && (
                    <AddEmployeeForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        loadEmployees={loadEmployees}
                    />
                )
            }
            <table className='employee-list-tble'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salery</th>
                        <th>Department</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{100000 + employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salery}</td>
                            <td>{employee.department}</td>
                            <td>{employee.address}</td>
                            <td className='actions'>
                                <button onClick={() => editEmployee(employee)}>Edit</button>
                                <button onClick={() => deleteEmployee(employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
