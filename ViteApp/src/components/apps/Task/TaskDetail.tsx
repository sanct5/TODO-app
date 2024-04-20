import { useParams } from "react-router-dom";
import data from './data.json';

const TaskDetail = () => {
    const {id} = useParams();
    const task = data.tasks.find(task => task.id === parseInt(id));
    return (
        <div>
            {task ? (
                <h1>{task.title}</h1>
                
            ) : (
                <h1>Task not found</h1>
            )}
            <h2>{task.description}</h2>
        </div>
    );
};
export default TaskDetail;
