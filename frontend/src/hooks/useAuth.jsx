import { useQuery } from '@tanstack/react-query';
import apiClient from '../api';

const useAuth = () => {
    const { data, isPending, refetch, isRefetching, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => await apiClient.getLoggedInUser(),
        retry: false,
      });

  return { data, isPending, refetch, isRefetching, isLoading  }
}

export default useAuth