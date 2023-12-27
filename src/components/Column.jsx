import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Column = ({ statuses, status, ToDo, Ongoing, Completed, refetch}) => {
    // console.log('here', ToDo)
    const axiosSecure= useAxiosSecure();
    
    let TasksToMap = ToDo;
        if (status === "Ongoing") {
            TasksToMap = Ongoing
        }
        if (status === "Completed") {
            TasksToMap = Completed
        }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item._id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection = (id) => {
        // console.log("dropped", id, "status:", status);
        axiosSecure.patch(`/taskList?id=${id}&status=${status}`)
            .then(res=>{
                // console.log(res.data)
                refetch()
            })
    }
    return (
        <div ref={drop} className="min-h-[70vh]">
            <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">{status}</h1>
            {
                TasksToMap.map((task, idx) => {

                    return <TaskCard key={idx} task={task} refetch={refetch}></TaskCard>
                })
            }
        </div>
    )


};

export default Column;