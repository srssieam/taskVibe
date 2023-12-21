import { Badge, Box, Button, Container, IconButton, Modal, Stack, TextField } from "@mui/material";
import useTasks from "../hooks/useTasks";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

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
    const [taskList, refetch] = useTasks();
    // console.log(taskList)
    const ToDo = taskList?.filter(task => task.status === "To Do")
    // console.log(ToDo)
    const Ongoing = taskList?.filter(task => task.status === "Ongoing")
    const Completed = taskList?.filter(task => task.status === "Completed")

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
                        if(res.data.insertedId){
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

    return (
        <div>
            <Container maxWidth="lg">
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
                <div className="grid grid-cols-3 gap-3 my-5">
                    <div className="border-2 border-purple-800 rounded-xl p-2 min-h-[70vh]">
                        <h1 className="text-2xl font-semibold text-center py-2 rounded-xl bg-gradient-to-r from-[#74f74c] to-[#48ffd7]">To Do</h1>
                        {
                            ToDo?.map(task => <div key={task._id} className="p-2 border border-[#237447] rounded-xl my-2 space-y-3">
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

                            </div>)
                        }
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Dashboard;