import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [mysqlData, setMysqlData] = useState([]);
    const [mongodbData, setMongodbData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/mysql')
            .then(response => setMysqlData(response.data))
            .catch(error => console.error('Error fetching MySQL data:', error));

        axios.get('http://localhost:5000/api/mongodb')
            .then(response => {
                console.log('MongoDB Data:', response.data);
                setMongodbData(response.data);
            })
            .catch(error => console.error('Error fetching MongoDB data:', error));
    }, []);

    return (
        <div className="App">
            <div className="data-container">
                <div className="mysql-data">
                    <h1>MySQL Data</h1>
                    <ul>
                        {mysqlData.map((item, index) => (
                            <li key={index}>
                                Employee ID: {item.employee_id}<br />
                                First Name: {item.first_name}<br />
                                Last Name: {item.last_name}<br />
                                Hourly Pay: {item.hourly_pay !== null ? `$${item.hourly_pay}` : 'N/A'}<br />
                                Hire Date: {item.hire_date ? new Date(item.hire_date).toLocaleDateString() : 'N/A'}<br />
                                Phone Number: {item.phone_number || 'N/A'}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mongodb-data">
                    <h1>MongoDB Data</h1>
                    <ul>
                        {mongodbData.map((item, index) => (
                            <li key={index}>
                                Name: {item.name}, Age: {item.age}, GPA: {item.gpa}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
