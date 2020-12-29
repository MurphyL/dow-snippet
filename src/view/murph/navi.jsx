import { useParams } from "react-router-dom";

import { AjaxLoadable } from 'utils/loading/loading.jsx';

const Dashboard = () => {
    return (
        <AjaxLoadable url="/x/navi.json" render={ (res) => {
            return JSON.stringify(res);
        }} />
    );
};

export default Dashboard;