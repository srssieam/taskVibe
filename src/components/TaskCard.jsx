import { Badge, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag } from "react-dnd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TaskCard = ({task, refetch}) => {
    const axiosSecure = useAxiosSecure();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {_id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
//    console.log(isDragging)

   const handleDelete = (task) => {
    axiosSecure.delete(`/taskList/${task._id}`)
        .then(res => {
            // console.log(res.data)
            refetch()
            if (res.data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Task has been deleted.",
                    icon: "success",
                    timer: 1500
                });
            }
        })

}
    return (
        <div ref={drag} className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
            <h3 className="font-semibold">{task.taskTitle}</h3>
            <p className="text-sm text-justify">{task.description}</p>
            <div className="flex justify-between items-center">
                <Badge sx={{ fontSize: "12px", backgroundColor: "#1d383f", color: "#48ffd7", borderRadius: "50px", padding: "4px 6px", borderBottom: "4px solid #74f74c" }}>{task.deadline}</Badge>
                <Stack direction="row" spacing={1}>
                    <Link to={`/update-product/${task._id}`}>
                        <IconButton sx={{}} variant="contained" color="success" aria-label="edit">
                            <EditOutlinedIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={() => { handleDelete(task) }} sx={{}} variant="contained" color="error" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </div>
        </div>
    );
};

export default TaskCard;