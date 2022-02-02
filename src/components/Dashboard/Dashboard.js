import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import AllProjects from './AllProjects';
import Card from './Card';
import Sidebar from './Sidebar';

function Dashboard() {
  const {documents, error} = useCollection('projects')

  return (<div>
  {/* <Sidebar/> */}
  <h2 className="page-title">Dashboard</h2>
  {error && <p>{error}</p>}
  {documents && <AllProjects projects={documents}/>}
  </div>);
}

export default Dashboard;
