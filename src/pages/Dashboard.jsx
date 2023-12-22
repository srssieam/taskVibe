import { Badge, Box, Button, Container, IconButton, Modal, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import { useState } from "react";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { control, handleSubmit, reset } = useForm()
    const [TaskList, refetch] = useTasks()
    const [tasks, setTasks] = useState(TaskList);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = (data) => {
        // console.log(data); 
        const newTask = {
            taskTitle: data.taskTitle,
            deadline: data.deadline,
            description: data.description,
            status: "To Do",
            userEmail: user.email
        }
        // console.log(newTask)
        axiosSecure.post('/taskList', newTask)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('user added to the database');
                    Swal.fire({
                        title: "Task Added!",
                        text: "Task has been added successfully!",
                        icon: "success"
                    });
                    setOpen(false)
                    refetch()
                    reset()
                }
            })

    };

    const handleDelete = (task) => {
        axiosSecure.delete(`/taskList/${task._id}`)
            .then(res => {
                console.log(res.data)
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



    const handleDragEnd = (result) => {
        

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);

        movedTask.status = result.destination.droppableId; // Update task status

        setTasks(updatedTasks); // Update state with new order

        // Make API call to update backend with new order
        // Example: axios.put(`http://localhost:5000/tasks/${movedTask.id}`, { status: 'Ongoing' });
    };
    const getColumnTasks = (status) => {
        return tasks.filter(task => task.status === status);
    };
    return (
        <Container>
            <h1 className="text-3xl font-semibold text-[#1d383f] text-center underline my-6">Task management dashboard</h1>
            <Button onClick={handleOpen} variant="contained" sx={{ borderRadius: "50px", backgroundColor: "#1d383f", "&:hover": { backgroundColor: "#234629" }, borderBottom: "6px solid #48ffd7" }} startIcon={<AddIcon />}>
                Add task
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <Controller
                            name="taskTitle"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <p>Deadline:</p>
                        <Controller
                            name="deadline"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="date"

                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />


                        <Button type="submit" sx={{ borderRadius: "50px", backgroundColor: "#1d383f", "&:hover": { backgroundColor: "#234629" }, borderBottom: "6px solid #48ffd7" }} variant="contained">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-3 my-5">
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ border: '1px solid lightgrey', padding: '10px', minWidth: '250px' }}
                            >
                                <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">To Do</h1>
                                {getColumnTasks('To Do').map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
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
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="ongoing">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ border: '1px solid lightgrey', padding: '10px', minWidth: '250px' }}
                            >
                                <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">Ongoing</h1>
                                {getColumnTasks('Ongoing').map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
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
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="completed">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ border: '1px solid lightgrey', padding: '10px', minWidth: '250px' }}
                            >
                                <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">Completed</h1>
                                {getColumnTasks('Completed').map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
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
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </div>
            </DragDropContext>
        </Container>
    );
};

export default Dashboard;

