import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post"
import apiClient from "../../api";
import { useEffect } from "react";

const Posts = ({feedType}) => {


	const getPostEndPoint = () => {
		switch (feedType) {
			case "forYou": 
			return '/api/v1/posts/all-posts';
			case "following":
			return '/api/v1/posts/following';
			default:
				return "/api/v1/posts/all-posts"
		}
	}

	const POST_ENDPOINT = getPostEndPoint();

	const { data: posts, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => await apiClient.getPosts(POST_ENDPOINT)
	});


	useEffect(() => {
		refetch();
	}, [feedType, refetch])

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;