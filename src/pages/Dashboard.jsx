import { Badge, Container, IconButton, Stack } from "@mui/material";
import useTasks from "../hooks/useTasks";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [taskList, refetch] = useTasks();
    // console.log(taskList)
    const ToDo = taskList?.filter(task => task.status === "To Do")
    // console.log(ToDo)
    const Ongoing = taskList?.filter(task => task.status === "Ongoing")
    const Completed = taskList?.filter(task => task.status === "Completed")

    const handleDelete = (task) => {

    }

    return (
        <div>
            <Container maxWidth="lg">
                <h1 className="text-3xl font-semibold text-[#1d383f] text-center underline my-6">Task management dashboard</h1>
                <div className="grid grid-cols-3 gap-3">
                    <div className="border-2 border-purple-800 rounded-xl p-2 min-h-[70vh]">
                        <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">To-do</h1>
                        {
                            ToDo?.map(task => <div key={task._id} className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
                                <h3 className="font-semibold">{task.taskTitle}</h3>
                                <p className="text-sm text-justify">{task.description}</p>
                                <div className="flex justify-between items-center">
                                    <Badge sx={{fontSize:"12px", backgroundColor:"#1d383f", color:"#48ffd7", borderRadius:"50px" , padding:"4px 6px", borderBottom:"4px solid #74f74c"}}>{task.deadline}</Badge>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/update-product/${task._id}`}>
                                            <IconButton sx={{  }} variant="contained" color="success" aria-label="edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => { handleDelete(task) }} sx={{ }} variant="contained" color="error" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>

                            </div>)
                        }

                    </div>
                    <div className="border-2 border-purple-800 rounded-xl p-2 min-h-[70vh]">
                        <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">Ongoing</h1>
                        {
                            Ongoing?.map(task => <div key={task._id} className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
                                <h3 className="font-semibold">{task.taskTitle}</h3>
                                <p className="text-sm text-justify">{task.description}</p>
                                <div className="flex justify-between items-center">
                                    <Badge sx={{fontSize:"12px", backgroundColor:"#1d383f", color:"#48ffd7", borderRadius:"50px" , padding:"4px 6px", borderBottom:"4px solid #74f74c"}}>{task.deadline}</Badge>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/update-product/${task._id}`}>
                                            <IconButton sx={{  }} variant="contained" color="success" aria-label="edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => { handleDelete(task) }} sx={{ }} variant="contained" color="error" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>

                            </div>)
                        }
                    </div>
                    <div className="border-2 border-purple-800 rounded-xl p-2 min-h-[70vh]">
                        <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">Completed</h1>
                        {
                            Completed?.map(task => <div key={task._id} className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
                                <h3 className="font-semibold">{task.taskTitle}</h3>
                                <p className="text-sm text-justify">{task.description}</p>
                                <div className="flex justify-between items-center">
                                    <Badge sx={{fontSize:"12px", backgroundColor:"#1d383f", color:"#48ffd7", borderRadius:"50px" , padding:"4px 6px", borderBottom:"4px solid #74f74c"}}>{task.deadline}</Badge>
                                    <Stack direction="row" spacing={1}>
                                        <Link to={`/update-product/${task._id}`}>
                                            <IconButton sx={{  }} variant="contained" color="success" aria-label="edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => { handleDelete(task) }} sx={{ }} variant="contained" color="error" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>

                            </div>)
                        }
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Dashboard;