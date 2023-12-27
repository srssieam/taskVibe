
import { Box, Button, Container, Modal, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useTasks from '../hooks/useTasks';
import { useState } from "react";
import Column from "../components/Column";




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
    const [TaskList, refetch] = useTasks();
    

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = (data) => {
        const newTask = {
            taskTitle: data.taskTitle,
            deadline: data.deadline,
            description: data.description,
            status: "To Do",
            userEmail: user.email
        }
        console.log(newTask)

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

    
    const ToDo = TaskList.filter(todo => todo.status === "To Do");
    const Ongoing = TaskList.filter(ongoing => ongoing.status === "Ongoing")
    const Completed = TaskList.filter(completed => completed.status === "Completed")

    const statuses = ["To Do", "Ongoing", "Completed"]
    

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

                <div className="grid grid-cols-3 gap-3 my-5">
                    {
                        statuses.map((status, idx) => {
                            return <Column key={idx} statuses={statuses} ToDo={ToDo} Ongoing={Ongoing} Completed={Completed} status={status} refetch={refetch}></Column>
         
                        })
                    }   
                </div>
                
            </Container>
     
    );
};

export default Dashboard;