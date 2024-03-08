import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";
import BarChart from "../../components/BarChart";

const Home = () => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const user = useSelector((state) => state.Auth.user);
  const CHART_TITLE = {
    TOTAL_ACTIVITIES: "Total Activities by project",
    TOTAL_COSTS: "Total Costs by project"
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date();
        const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
        const activities = await api.get(`/activity?date=${date.getTime()}&user=${user.name}&project=undefined`);
        const projects = await api.get(`/project/list`);

        const projectDetails = activities.data.map((dataProject) => {
          return { ...dataProject, projectName: (dataProject.projectName =
              projects.data.find((project) => project._id === dataProject.projectId)?.name) };
        });
        setProjectData(projectDetails);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }
    fetchData();
  }, [user.name]);

  const totalActivitiesChart = {
    labels: projectData.map((proj) => proj.projectName),
    datasets: [
      {
        label: "Total Activities",
        data: projectData.map((proj) => proj.total),
        backgroundColor: [
          "rgb(28,68,119)",
          "rgba(157,16,16,0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(246,210,2,0.91)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const totalCostsChart = {
    labels: projectData.map((proj) => proj.projectName),
    datasets: [
      {
        label: "Total Costs",
        data: projectData.map((proj) => proj.cost),
        backgroundColor: [
          "rgba(246,210,2,0.91)",
          "rgba(162,157,157,0.6)",
          "rgba(157,16,16,0.6)",
          "rgb(5,33,70)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await api.get("/user/available");
        setAvailableUsers(data);
      } catch (error) {
        console.error("Error fetching available users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="px-2 md:!px-8 md:flex-row gap-5 mt-5">
      <div className="flex flex-col gap-20">
        <div className="flex-1 mb-[10px]">
          <h2 className="text-[22px] font-semibold mb-4">Available</h2>
          {availableUsers.map((user) => (
            <div key={user._id} className="bg-white mb-[10px] rounded-lg shadow-sm flex gap-4 p-3">
              <img src={user.avatar} alt="userlogo" className="rounded-full w-14 h-14" />
              <div>
                <h3 className="font-semibold text-lg mb-[3px]">{user.name}</h3>
                <h3 className="text-[#676D7C] text-sm">{user.job_title}</h3>
                <p className="text-[#676D7C] text-sm capitalize">{user.availability}</p>
              </div>
            </div>
          ))}
          {availableUsers.length === 0 ? <span className="italic text-gray-600">No available users.</span> : null}
        </div>
      </div>

      <div className="flex flex-col gap-20">
        <div className="flex flex-row gap-20">
          <div className="w-1/3">
            <BarChart chartData={totalActivitiesChart} chartLabel={CHART_TITLE.TOTAL_ACTIVITIES} />
          </div>
          <div className="w-1/3">
            <BarChart chartData={totalCostsChart} chartLabel={CHART_TITLE.TOTAL_COSTS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
