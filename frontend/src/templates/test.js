import React, { useEffect, useState } from 'react';
import './RocketlaneTasks.css';

const projectList = [
  { projectName: 'Timecards', projectId: 588955 },
  { projectName: 'EstimateToBudget', projectId: 456967 },
  { projectName: 'CostToComplete', projectId: 542163 },
  { projectName: 'AP AutoPilot', projectId: 610510 },
  { projectName: 'Billings', projectId: 690099 },
  { projectName: 'Production Tracker', projectId: 455704 },
];

const RocketlaneTasks = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (index) => {
    if (index === null) return;

    const project = projectList[index];
    try {
      const response = await fetch(
        `https://briq.api.rocketlane.com/api/v1/projects/${project.projectId}/tasks`,
        {
          method: 'GET',
          headers: {
            'api-key': 'cef0d53b-01e4-41f5-be7c-8fd0315b1084',
            'Accept': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    }
  };

  const handleDownloadCSV = () => {
    if (selectedProjectIndex === null) {
      alert('Please select a project');
      return;
    }
    const tableName = projectList[selectedProjectIndex].projectName;
    const headers = ['ID', 'Project', 'Project Phase', 'Title', 'Task Description', 'Assignee(s)', 'Due Date', 'Status'];
    const rows = tasks.map((task) => [
      task.taskId,
      task.project?.projectName,
      task.projectPhase?.projectPhaseName || 'No Phase',
      task.taskName,
      task.taskDescription || '',
      task.assignee?.users?.map(u => `${u.firstName} ${u.lastName || ''}`).join(', ') || 'Unassigned',
      isNaN(new Date(task.dueDate)) ? 'No Due Date' : new Date(task.dueDate).toLocaleDateString(),
      task.fields?.[0]?.metaFieldValue?.label?.toUpperCase() || 'No Status',
    ]);

    const csvContent = [headers, ...rows].map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${tableName}_Tasks_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="container mt-4">
      <h1>Tasks</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => {
              const index = e.target.value;
              setSelectedProjectIndex(index);
              fetchTasks(index);
            }}
            defaultValue=""
          >
            <option value="" disabled>Select Project</option>
            {projectList.map((proj, index) => (
              <option key={index} value={index}>{proj.projectName}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success" onClick={handleDownloadCSV}>Download CSV</button>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Project Phase</th>
            <th>Title</th>
            <th>Task Description</th>
            <th>Assignee(s)</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.project?.projectName}</td>
              <td>{task.projectPhase?.projectPhaseName || 'No Phase'}</td>
              <td>{task.taskName}</td>
              <td dangerouslySetInnerHTML={{ __html: task.taskDescription || '' }}></td>
              <td>{task.assignee?.users?.map(u => `${u.firstName} ${u.lastName || ''}`).join(', ') || 'Unassigned'}</td>
              <td>{isNaN(new Date(task.dueDate)) ? 'No Due Date' : new Date(task.dueDate).toLocaleDateString()}</td>
              <td className={(() => {
                const value = task.fields?.[0]?.metaFieldValue?.value;
                switch (value) {
                  case 1: return 'text-primary';
                  case 2: return 'text-warning';
                  case 3: return 'text-success';
                  case 4: return 'text-secondary';
                  case 5: return 'text-danger';
                  default: return '';
                }
              })()}>
                {task.fields?.[0]?.metaFieldValue?.label?.toUpperCase() || 'No Status'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RocketlaneTasks;
