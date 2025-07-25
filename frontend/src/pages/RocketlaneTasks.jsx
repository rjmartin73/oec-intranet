import React, { useEffect, useState } from "react";
// import './RocketlaneTasks.css';

const projectList = [
  { projectName: "Timecards", projectId: 588955 },
  { projectName: "EstimateToBudget", projectId: 456967 },
  { projectName: "CostToComplete", projectId: 542163 },
  { projectName: "AP AutoPilot", projectId: 610510 },
  { projectName: "Billings", projectId: 690099 },
  { projectName: "Production Tracker", projectId: 455704 },
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
          method: "GET",
          headers: {
            "api-key": "cef0d53b-01e4-41f5-be7c-8fd0315b1084",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  const handleDownloadCSV = () => {
    if (selectedProjectIndex === null) {
      alert("Please select a project");
      return;
    }
    const tableName = projectList[selectedProjectIndex].projectName;
    const headers = [
      "ID",
      "Project",
      "Project Phase",
      "Title",
      "Task Description",
      "Assignee(s)",
      "Due Date",
      "Status",
    ];
    const rows = tasks.map((task) => [
      task.taskId,
      task.project?.projectName,
      task.projectPhase?.projectPhaseName || "No Phase",
      task.taskName,
      task.taskDescription || "",
      task.assignee?.users
        ?.map((u) => `${u.firstName} ${u.lastName || ""}`)
        .join(", ") || "Unassigned",
      isNaN(new Date(task.dueDate))
        ? "No Due Date"
        : new Date(task.dueDate).toLocaleDateString(),
      task.fields?.[0]?.metaFieldValue?.label?.toUpperCase() || "No Status",
    ]);

    const csvContent = [headers, ...rows]
      .map((e) =>
        e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${tableName}_Tasks_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="container mt-4">
      <h1>Tasks</h1>
      <div className="row mb-3 ml-5">
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
            <option value="" disabled>
              Select Project
            </option>
            {projectList.map((proj, index) => (
              <option key={index} value={index}>
                {proj.projectName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 text-end">
          <button
            type="button"
            data-ripple-light="true"
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto text-sm sm:text-base">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left">ID</th>
                <th className="px-2 sm:px-4 py-2 text-left">Project</th>
                <th className="px-2 sm:px-4 py-2 text-left">
                  Project Phase
                </th>
                <th className="px-2 sm:px-4 py-2 text-left">Title</th>
                <th className="px-2 sm:px-4 py-2 text-left">
                  Task Description
                </th>
                <th className="px-2 sm:px-4 py-2 text-left">
                  Assignee(s)
                </th>
                <th className="px-2 sm:px-4 py-2 text-left">Due Date</th>
                <th className="px-2 sm:px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="group text-sm text-slate-800 dark:text-white">
              {tasks.map((task) => (
                <tr key={task.taskId}>
                  <td className="whitespace-nowrap">{task.taskId}</td>
                  <td className="break-words max-w-xs">{task.project?.projectName}</td>
                  <td className="break-words max-w-xs">
                    {task.projectPhase?.projectPhaseName || "No Phase"}
                  </td>
                  <td className="break-words max-w-xs">{task.taskName}</td>
                  <td
                    className="break-words max-w-xs"
                    dangerouslySetInnerHTML={{
                      __html: task.taskDescription || "",
                    }}
                  ></td>
                  <td className="p-3">
                    {task.assignee?.users
                      ?.map((u) => `${u.firstName} ${u.lastName || ""}`)
                      .join(", ") || "Unassigned"}
                  </td>
                  <td className="p-3">
                    {isNaN(new Date(task.dueDate))
                      ? "No Due Date"
                      : new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td
                    className={(() => {
                      const value = task.fields?.[0]?.metaFieldValue?.value;
                      switch (value) {
                        case 1:
                          return "text-blue";
                        case 2:
                          return "text-orange";
                        case 3:
                          return "text-owen-green";
                        case 4:
                          return "text-secondary";
                        case 5:
                          return "text-red";
                        default:
                          return "";
                      }
                    })()}
                  >
                    {task.fields?.[0]?.metaFieldValue?.label?.toUpperCase() ||
                      "No Status"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RocketlaneTasks;
