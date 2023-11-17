import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuthContext} from "../../context/useAuthcontext"
import "./project.css";

const Project = () => {
  const { userstudent } = useAuthContext();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    year: '',
    description: '',
    technologies: '',
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/InterConnect/student/getProjects/${userstudent.student_id}`);
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (index) => {
    setIsAdding(true);
    setNewProject(projects[index]);
    setEditingIndex(index);
  };

  const handleDeleteProject = async (index) => {
    try {
      await axios.delete(`http://localhost:4000/InterConnect/student/deleteProjects/${userstudent.student_id}/${projects[index]?._id}`);
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSaveProject = async () => {
    try {
      let response;

      if (editingIndex === -1) {
        // Add new project
        response = await axios.post(`http://localhost:4000/InterConnect/student/addProjects/${userstudent.student_id}`, newProject);
      } else {
        // Update existing project
        response = await axios.patch(`http://localhost:4000/InterConnect/student/editProjects/${userstudent.student_id}/${projects[editingIndex]?._id}`, newProject);
      }

      // Ensure the response structure matches the expected format
      const updatedProject = response.data.student?.projects;

      if (updatedProject) {
        const updatedProjects = [...projects];

        if (editingIndex === -1) {
          updatedProjects.push(updatedProject);
        } else {
          updatedProjects[editingIndex] = updatedProject;
        }

        setProjects(updatedProjects);
        setEditingIndex(-1);

        // Reset newProject to the initial state
        setNewProject({
          name: '',
          year: '',
          description: '',
          technologies: '',
        });

        setIsAdding(false);
        window.location.reload();
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error adding/updating project:', error);
    }
  };

  return (
    <div>
      <div className="view-project">
        <div className="projects">
          <h2>Projects</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <h3>{project.name}</h3>
                <p> <span>Year:</span> {project.year}</p>
                <p><span>Description: </span>{project.description}</p>
                <p><span>Technologies:</span> {project.technologies}</p>
                <div className="project-button">
                  <button onClick={() => handleEditProject(index)}>Edit</button>
                  <button onClick={() => handleDeleteProject(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h3>{editingIndex === -1 ? 'Add a Project' : 'Edit Project'}</h3>
            {isAdding && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Technologies"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                />
              </div>
            )}
            <button onClick={handleSaveProject}>
              {editingIndex === -1 ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
