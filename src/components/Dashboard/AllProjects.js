import React from 'react';
function AllProjects({projects}) {
  return ( <>
  {projects.length === 0 && <p>No projects yet!</p>}
  {projects.map(project => (
    <div key={project.id}>{project.name}</div>
  ))}
  </> );
}

export default AllProjects;
