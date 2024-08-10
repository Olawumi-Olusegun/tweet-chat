import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api";
import toast from "react-hot-toast";

const useFollow = () => {

    const queryClient = useQueryClient();

    const { mutate: followAndUnfollowMutation, isPending, isError, error } = useMutation({
        mutationKey: "followAndUnfollow",
        mutationFn: async (userId) => await apiClient.followAndUnfollow(userId),
        onSuccess: async () => {
            Promise.all([
                queryClient.invalidateQueries({queryKey: ["suggestedUsers"]}),
                queryClient.invalidateQueries({queryKey: ["authUser"]})
            ])
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })

    return { followAndUnfollowMutation, isPending, isError, error }; 
}

export default useFollow;