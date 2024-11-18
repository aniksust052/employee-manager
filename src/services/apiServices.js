import axios from "axios";

class ApiServices {
    static deployedUrl = 'https://employee-spring-boot-production.up.railway.app';
    static localUrl = 'http://localhost:8080';

    static async signUP (user) {
        console.log(user);
        try{
            const response = await axios.post(
                `${this.localUrl}/auth/register`,
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
                `${this.localUrl}/auth/login`,
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
        localStorage.removeItem("employee");
    }

    static async addAnEmployee (token, employee) {
        try {
            const response = await axios.post(
                `${this.localUrl}/api/employees`,
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
                `${this.localUrl}/api/employees`,
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
                `${this.localUrl}/api/employees/${employee.id}`,
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
                `${this.localUrl}/api/employees/${id}`,
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