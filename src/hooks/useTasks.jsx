import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTasks = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const {data: TaskList = [], refetch} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/taskList?email=${user.email}`);
            return res.data;
        }
    })
    return [ TaskList, refetch ]

};

export default useTasks;