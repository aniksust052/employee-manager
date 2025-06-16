import axios from "axios";

class ApiServices {
    // static deployedUrl = 'https://employee-spring-boot-production.up.railway.app';
    static deployedUrl = 'https://lobiq.xyz';
    static localUrl = 'http://localhost:8080';

    static async signUP (user) {
        console.log(user);
        try{
            const response = await axios.post(
                `${this.deployedUrl}/auth/register`,
                user
            );

            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async login (data) {
        
        try{
            const response = await axios.post(
                `${this.deployedUrl}/auth/login`,
                data
            );

            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static logout () {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static async addAnEmployee (token, employee) {
        try {
            const response = await axios.post(
                `${this.deployedUrl}/api/employees`,
                employee,
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    }
                }
            )

            return response.data;
        } catch (err ) {
            throw(err);
        }
    }

    static async getAllEmployees (token) {
        try{
            const response = await axios.get(
                `${this.deployedUrl}/api/employees`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch (err) {
            throw(err);
        }
    }

    static async updateAnEmployee(token, employee) {
        try {
            const response = await axios.put(
                `${this.deployedUrl}/api/employees/${employee.id}`,
                employee,
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    }
                }
            )

            return response.data;
        } catch (err ) {
            throw(err);
        }
    }

    static async deleteAnEmployee (token, id) {
        try {
            const response = await axios.delete(
                `${this.deployedUrl}/api/employees/${id}`,
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    }
                }
            )

            return response.data;
        } catch (err ) {
            throw(err);
        }
    }

    static isAuthenticate () {
        const token = localStorage.getItem("token");
        return token ? true : false;
    }

    static isManager () {
        return localStorage.getItem("role") === 'MANAGER';
    }

    static isEmployee () {
        return localStorage.getItem("role") === 'EMPLOYEE';
    }




}


export default ApiServices;
