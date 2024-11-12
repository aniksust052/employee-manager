import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import AddEmployeeForm from '../components/AddEmployeeForm';
import $ from 'jquery';

export default function Employees() {

    const [employees, setEmployees] = useState( JSON.parse(localStorage.getItem( "employees" ) ) || "" );

    async function loadEmployees () {
        const fetchEmployees = await fetch( 'https://employee-spring-boot-production.up.railway.app/api/employees' ).then( (res) => res.json() );
        localStorage.setItem( "employees", JSON.stringify( fetchEmployees ) );
        setEmployees(() => fetchEmployees);
    }

    useEffect( () => {
        $(document).on('click','.edit', () => {
            $('.employee-form-wrapper').css({
              display: 'flex',
            });
        });
        $(document).on('click', '#add', () => {
            loadEmployees();
            $('.employee-form-wrapper').css({
                display: 'none',
            });
        });
        loadEmployees();
    }, []);

    function editEmployee (employee) {
        $('#employeeId').val(employee.id);
        $('#firstName').val(employee.firstName);
        $('#lastName').val(employee.lastName);
        $('#email').val(employee.email);
        $('#salery').val(employee.salery);
        $('#department').val(employee.department);
        $('#address').val(employee.address);
    }
    function deleteEmployee (employee) {
        async function deleteEmpl () {
            await fetch(`https://employee-spring-boot-production.up.railway.app/api/employees/${employee.id}`, {
                method: 'DELETE'
            });
        }
        deleteEmpl();
        loadEmployees();
    }

    return (
        <div>
            <Nav />
            <AddEmployeeForm />
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
                    {
                        employees.map( (employee, key) => {
                            return(
                                <tr>
                                    <td>{ 100000 + employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.salery}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.address}</td>
                                    <td className='actions'>
                                        <button class="edit" onClick={() => editEmployee(employee)}>
                                            Edit
                                        </button>
                                        <button class="delete" onClick={() => deleteEmployee(employee)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        } )
                    }
                </tbody>
            </table>
        </div>
    );
}
