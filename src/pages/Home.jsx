import { useEffect } from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import AddEmployeeForm from "../components/AddEmployeeForm";
import $ from 'jquery';

export default function Home () {
    const deployedUrl = 'https://employee-spring-boot-production.up.railway.app'; 
    useEffect(() => {
        $('.add-empl-btn').on('click', () => {
            $('.employee-form-wrapper').css({
                display: 'flex',
            });
        });
      
        return () => {
            $('.add-empl-btn').off('click');
        };
    }, []);
      
    
    return (
        <div className="home">
            <Nav />
            <Welcome />
            <div className="add-employee">
                <button className="add-empl-btn">Add New Employee</button>
            </div>
            <AddEmployeeForm />
        </div>
    );
}