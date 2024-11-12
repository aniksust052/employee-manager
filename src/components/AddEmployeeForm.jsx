import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';

export default function AddEmployeeForm() {
    const[isFieldVisible, setIsFieldVisible] = useState(true);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if(!data || !data.firstName || !data.email || !data.salery || !data.department || !data.address ){
            return;
        }
        const newEmployee = {
            employeeId : data.employeeId,
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            salery : data.salery,
            department : data.department,
            address : data.address,
        }
        formRef.current.reset();
        
        try {
            if(newEmployee.employeeId){
                const response = await fetch(`https://employee-spring-boot-production.up.railway.app/api/employees/${newEmployee.employeeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEmployee),
                });
            }
            else{
                const response = await fetch('https://employee-spring-boot-production.up.railway.app/api/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEmployee),
                });
            }
            const result = await response.json();
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        $('.close-form-btn').on('click', () => {
          $('.employee-form-wrapper').css({
            display: 'none',
          });
        });
      
        return () => {
          $('.close-form-btn').off('click');
        };
    }, []);
    
    
    return (
        <div className='employee-form-wrapper'>
             <form id="employee-form" ref={formRef} onSubmit={handleSubmit} >
                <table class="em-form">
                    <tr>
                        <td>
                            <input type="hidden" id="employeeId" name='employeeId' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="firstName">First Name</label>
                        </td>
                        <td>
                            <input type="text" id="firstName" name="firstName" required={isFieldVisible} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName">Last Name</label>
                        </td>
                        <td>
                            <input type="text" id="lastName" name="lastName" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email</label>
                        </td>
                        <td>
                            <input type="text" id="email" name="email" required={isFieldVisible} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="salery">Salery</label>
                        </td>
                        <td>
                            <input type="text" id="salery" name="salery" required={isFieldVisible} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="department">Department</label>
                        </td>
                        <td>
                            <input type="text" id="department" name="department" required={isFieldVisible} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address">Address</label>
                        </td>
                        <td>
                            <input type="text" id="address" name="address" required={isFieldVisible} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" id="add">Submit</button>
                        </td>
                        <td>
                            <button type='button' className='close-form-btn'>Close</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}