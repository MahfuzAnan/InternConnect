import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/helper';


const Companypool = () => {
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/InterConnect/company/companies`)
      .then((response) => {
        const allCompanies = response.data;

        if (!allCompanies || allCompanies.length === 0) {
          console.log('No companies found.');
          return;
        }

      const hiringCompanies = allCompanies.filter((company) => company.status === 'Hiring');
        setCompanies(hiringCompanies);
        setFilteredCompanies(hiringCompanies); // Initially, both arrays are the same
      })
      .catch((error) => {
        console.error('An error occurred while fetching companies:', error);
      });
  }, []);

  useEffect(() => {
    // Filter companies based on search input
    const filtered = companies.filter((company) => {
      const companyData = `${company.name} ${company.address} ${company.email} ${company.contactNumber}`.toLowerCase();
      return companyData.includes(search.toLowerCase());
    });

    setFilteredCompanies(filtered);
  }, [search, companies]);

  return (
    
    <main className="table">
      <section className="table__header">
        <h1>Company Details </h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
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
              <th> Title </th>
              <th> Address </th>
              <th> Email </th>
              <th> Contact Number </th>
              <th> Min Interns </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.email}</td>
                <td>{company.contactNumber}</td>
                <td>{company.internsHired}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Companypool;
