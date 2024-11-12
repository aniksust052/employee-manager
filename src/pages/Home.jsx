import { useState } from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import AddEmployeeForm from "../components/AddEmployeeForm";

export default function Home() {

    const [showForm, setShowForm] = useState(false);

    const deployedUrl = 'https://employee-spring-boot-production.up.railway.app';

    const addEmployee = () => {
        setShowForm(true);
    }


    return (
        <div className="home">
            <Nav />
            <Welcome />
            <div className="add-employee" onClick={addEmployee} >
                <button className="add-empl-btn">Add New Employee</button>
            </div>
            {
                showForm && (
                    <AddEmployeeForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                    />
                )
            }

        </div>
    );
}