import { useParams } from "react-router-dom";

import { AjaxLoadable } from 'utils/loading/loading.jsx';

const Dashboard = () => {
    const { unique } = useParams();
    return (
        <AjaxLoadable url="/x/navi.json" render={ (res) => {
            return unique + ' = ' + JSON.stringify(res);
        }} />
    );
};

export default Dashboard;