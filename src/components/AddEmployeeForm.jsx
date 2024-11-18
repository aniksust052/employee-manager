import React, { useRef, useEffect } from 'react';
import ApiServices from '../services/apiServices';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeeForm({
    showForm,
    setShowForm,
    selectedEmployee = () => { },
    setSelectedEmployee = () => { },
    loadEmployees = () => { }
}) {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        const manager = ApiServices.isManager();
        const token = localStorage.getItem("token");
        if(!manager){
            navigate('/login');
            return;
        }

        const employee = {
            id: data.id || null,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            salery: parseFloat(data.salery) || 0,
            department: data.department || '',
            address: data.address || '',
        };

        if (!employee.firstName || !employee.email || !employee.salery || !employee.department || !employee.address) {
            alert('All required fields must be filled!');
            return;
        }

        try {
            if (employee.id) {
                const response = await ApiServices.updateAnEmployee(token, employee);
            } else {
                const response = await ApiServices.addAnEmployee(token, employee);
                navigate('/employees');
            }

            loadEmployees();
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedEmployee(null);
    };

    useEffect(() => {
        if (formRef.current && selectedEmployee) {
            Object.entries(selectedEmployee).forEach(([key, value]) => {
                const field = formRef.current.elements[key];
                if (field) field.value = value || '';
            });
        } else if (formRef.current) {
            formRef.current.reset();
        }
    }, [selectedEmployee]);

    // if (!showForm) return null;

    return (
        <div className='employee-form-wrapper'>
            <form id="employee-form" ref={formRef} onSubmit={handleSubmit}>
                <table className="em-form">
                    <tbody>
                        <tr>
                            <td>
                                <input type="hidden" id="id" name="id" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="firstName">First Name</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lastName">Last Name</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">Email</label>
                            </td>
                            <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="salery">Salary</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    id="salery"
                                    name="salery"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="department">Department</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="address">Address</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Submit</button>
                            </td>
                            <td>
                                <button type="button" onClick={handleClose}>
                                    Close
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}