import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Studentlist = () => {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/InterConnect/student/students`)
      .then((response) => {
        const sortedStudents = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents); // Initially, both arrays are the same
      })
      .catch((error) => {
        console.error('An error occurred while fetching students:', error);
      });
  }, []);


  useEffect(() => {
    // Filter students based on search input
    const filtered = students.filter((student) => {
      const studentData = `${student.name} ${student.student_id} ${student.email} ${student.currentStatus} ${student.CGPA}`.toLowerCase();
      return studentData.includes(search.toLowerCase());
    });

    setFilteredStudents(filtered);
  }, [search, students]);

  return (
    <main className="table">
      <section className="table__header">
      
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           <img src='search.png'></img>
        </div>
      </section>

      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Year</th>
              <th>Account Status</th>
              <th>CGPA</th>
              <th>CV</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.student_id}</td>
                <td>{student.email}</td>
                <td>{new Date(student.createdAt).getFullYear()}</td>
                <td style={{ color: student.accountActivationStatus ? 'green' : 'red' }}>
                  {student.accountActivationStatus ? 'Activated' : 'Deactivated'}
                </td>
                <td>{student.CGPA}</td>
                <td style={{textDecoration:"underline"}}><a  href={`${BASE_URL}/InterConnect/student/getcv/`+student.student_id} download={student.student_id+".pdf"}>{student.CV}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Studentlist;
