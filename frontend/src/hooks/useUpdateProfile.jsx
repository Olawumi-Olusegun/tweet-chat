import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '../api';


const useUpdateProfile = () => {

    const queryClient = useQueryClient();

	const { mutateAsync: updateProfileMutation, isPending: isUpdating } = useMutation({
		mutationKey: ["updateProfile"],
		mutationFn:  async (formData) => await apiClient.updateProfile(formData),
		onSuccess: () => {
			toast.success("Profile updated successfully")
			Promise.all([
				queryClient.invalidateQueries({queryKey: ["authUser"]}),
				queryClient.invalidateQueries({queryKey: ["userProfile"]}),
			])
		},
		onError: (error) => {
			console.log(error)
			toast.error(error?.message)
		},
	});


  return { updateProfileMutation, isUpdating }
}

export default useUpdateProfile