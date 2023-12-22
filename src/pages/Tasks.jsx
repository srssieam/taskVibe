import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Task } from "@mui/icons-material";
import useTasks from "../hooks/useTasks";


const Tasks = () => {
    const [ TaskList, refetch ] = useTasks()
    return (
        <Container maxWidth="lg">
            <h1 className="text-3xl font-semibold text-[#1d383f] text-center underline my-6">Your all tasks</h1>
            <TableContainer sx={{ maxWidth: "100%", margin: "15px 0px" }} component={Paper}>
                <Table >
                    <TableHead sx={{ backgroundColor: "#74f74c", width: "100%" }}>
                        <TableRow>
                            <TableCell align="left"><span className="font-semibold">No.</span></TableCell>
                            <TableCell align="left"><span className="font-semibold">Title</span></TableCell>
                            <TableCell align="left"><span className="font-semibold">Deadline</span></TableCell>
                            <TableCell align="left"><span className="font-semibold">Status</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            TaskList.map((task, idx) => <TableRow key={task._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left"><Task></Task> {idx + 1}</TableCell>
                                <TableCell align="left">
                                    {task.taskTitle}
                                </TableCell>
                                <TableCell align="left">{task.deadline}</TableCell>
                                <TableCell align="left"><span className="bg-[#1d383f] text-[#74f74c] px-2 py-1 rounded">{task.status}</span></TableCell>
                            </TableRow>)
                        }



                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Tasks;