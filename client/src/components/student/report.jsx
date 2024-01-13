import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../context/useAuthcontext";
import React, { useState, useEffect} from 'react';
import {useAuthContext} from "../../context/useAuthcontext"
import axios from "axios";
import download from 'js-file-download';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadReport = () => {
  const { userstudent } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [hasReport, setHasReport] = useState(false);
  const [report, setReport] = useState('');

  useEffect(() => {
    if (userstudent) {
      setId(userstudent.student_id);
      if (userstudent.student_id) {
        try {
          axios.get(`http://localhost:4000/InterConnect/student/getStudent/${userstudent.student_id}`).then((response) => {
            if (response.data.student.internshipReport) {
              setHasReport(true);
            }
          }).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
          });
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      if (userstudent.report) {
        setHasReport(true);
      }
      setLoading(false);
    }
  }, [userstudent]);

  useEffect(() => {
    if (id) {
      try {
        console.log("came here")
        axios.get(`http://localhost:4000/InterConnect/student/getOnestudent/${id}`).then((response) => {
          setReport(response.data.students.internshipReport);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }, [id]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    console.log("file", selectedFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData)
    try {
      await axios.post(`http://localhost:4000/InterConnect/student/uploadInternshipReport/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response)
        toast.success('Report has been uploaded.')
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }).catch((error) => {
        toast.error("Error occurred, try again")
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
          toast.error('Failed to upload', { position: "top-right" });
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });

    } catch (error) {
      console.error('An error occurred:', error);
    }
    setSelectedFile(null)
  }

  const handleView = async (event) => {
    event.preventDefault()
    try {
      const reportUrl = `http://localhost:4000/InterConnect/student/getStudentReport/${id}`;
      window.open(reportUrl, '_blank');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div className='admincontainer'>
        <div className='studenttext'>
          <h3>Empower Your Journey</h3>
          <h1> Unleash Your Potential with Your Report</h1>
        </div>
        <div className='adminimage'>
          <img src="cv-up.gif" alt="" />
        </div>
      </div>

      <div className="studentguideline">
        <ul>
          <li>Use a clear and professional format for your Report (preferably in Latex).</li>
          <li>Include your contact information at the top of the Report.</li>
          <li>Highlight your skills, experience, and education.</li>
          <li>Tailor your Report for the specific job or internship you're applying for.</li>
          <p>For more detailed guidelines, please refer to our <a href="/Guildeline">Guidelines Page</a>.</p>
        </ul>

        <div className="sample-cvs">
          <a href="cvsample1.pdf" download>Download Sample Report 1</a>
          <a href="cvsample2.pdf" download>Download Sample Report 2</a>
          <a href="cvsample3.pdf" download>Download Sample Report 3</a>
        </div>

        <div className="xcellupload">
          <input type="file" accept=".pdf" onChange={handleFileSelect} />
          {hasReport ? <button onClick={handleSubmit}>Upload</button> : <button onClick={handleSubmit}>Upload</button>}
        </div>
        {hasReport && <button onClick={handleView}>View your Report </button>}
      </div>

    </div>
  );
};

export default UploadReport;
