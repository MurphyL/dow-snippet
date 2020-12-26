import { useParams } from "react-router-dom";

// 常用工具

const Dashboard = () => {
    const { unique } = useParams();
    return `Hello, ${unique}`;
};

export default Dashboard;