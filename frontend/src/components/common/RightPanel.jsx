import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api";
import useFollow from "../../hooks/useFollow";
import LoadingSpinnerSmall from "./LoadingSpinnerSmall";


const RightPanel = () => {

	const { data: suggestedUsers, isLoading,  } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => await apiClient.suggestedUsers(),
	});

	const {followAndUnfollowMutation, isPending } = useFollow();

	const handleFollowAndUnfollow = (event, userId) => {
		event.preventDefault();

		followAndUnfollowMutation(userId)
	}	


	if(suggestedUsers?.length === 0) {
		return <div className="p-5 md:w-64"></div>
	}


	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{/* item */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						suggestedUsers?.map((user) => (
							<Link
								to={`/profile/${user.userName}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.userName}</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(event) => handleFollowAndUnfollow(event, user?._id)}
									>
										{ isPending 
										? <LoadingSpinnerSmall />
										: "Follow" 
										}
									</button>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;