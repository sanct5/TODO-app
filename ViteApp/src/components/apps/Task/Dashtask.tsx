import CardTask from "./CardTask"
import data from './data.json'; // Importa el JSON

const Dashtask = () => {
    return (
        <div className='bg-gradient-to-r from-purple-400 to-purple-300 h-screen'>
            <div className="flex justify-left items-start pl-16 pt-16">
                {data.tasks.map(task => ( // Mapea las tareas del JSON
                    <div className="ml-4 mb-4">
                        <CardTask
                            id={task.id}
                            description={task.description}
                            title={task.title}
                            endDate={task.endDate}
                            steps={task.steps}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashtask