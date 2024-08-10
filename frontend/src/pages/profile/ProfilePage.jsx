import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api";
import { formatMemberSinceDate } from "../../utils/date";
import useFollow from "../../hooks/useFollow";
import LoadingSpinnerSmall from "../../components/common/LoadingSpinnerSmall";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const ProfilePage = () => {
	const [coverImage, setCoverImage] = useState(null);
	const [profileImage, setProfileImage] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImageRef = useRef(null);
	const profileImageRef = useRef(null);

	const { username } = useParams();
	const { followAndUnfollowMutation, isPending } = useFollow();

	const { data: userData } = useQuery({queryKey: ["authUser"]})
	const authUser = userData?.data;

	const { updateProfileMutation, isUpdating } = useUpdateProfile()

	const { data: user, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ["userProfile"],
		queryFn:  async () => await apiClient.userProfile(username),
		enabled: !!username,
	});


	const memberSinceData = formatMemberSinceDate(user?.createdAt);
	const isMyProfile = authUser?._id === user?._id;
	const amImFollowing = authUser?.followers?.includes(user?._id);


	useEffect(() => {
		refetch();
	}, [username, refetch])


	const handleImageChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImage" && setCoverImage(reader.result);
				state === "profileImage" && setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageUpdate = async () => {
		if(isUpdating) return;
		await updateProfileMutation({coverImage, profileImage})
		setCoverImage(null);
		setProfileImage(null)
	}

	if(!username || !user) {
		return null;
	}


	return (
		<>
			<div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
				{/* HEADER */}
				{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
				{!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className='flex flex-col w-full min-w-full flex-1'>
				
					{!isLoading && !isRefetching && user && (
						<>
							<div className='flex gap-10 px-4 py-2 items-center w-full'>
								<Link to='/' className="hover:bg-gray-200/10 rounded-full duration-300 p-2">
									<FaArrowLeft className='w-4 h-4' />
								</Link>
								<div className='flex flex-col'>
									<p className='font-bold text-lg'>{user?.fullName}</p>
									<span className='text-sm text-slate-500'>{POSTS?.length} posts</span>
								</div>
							</div>
							{/* COVER IMG */}
							<div className='relative group/cover'>
								<img
									src={coverImage || user?.coverImage || "/cover.png"}
									className='h-52 w-full object-cover pointer-events-none'
									alt='cover image'
								/>
								{isMyProfile && (
									<div
										className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
										onClick={() => coverImageRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</div>
								)}

								<input
									type='file'
									hidden
									ref={coverImageRef}
									onChange={(e) => handleImageChange(e, "coverImage")}
								/>
								<input
									type='file'
									hidden
									ref={profileImageRef}
									onChange={(e) => handleImageChange(e, "profileImage")}
								/>
								{/* USER AVATAR */}
								<div className='avatar absolute -bottom-16 left-4'>
									<div className='w-32 rounded-full relative group/avatar'>
										<img src={profileImage || user?.profileImage || "/avatar-placeholder.png"} alt="Profile-Image" className="pointer-events-none" />
										<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => profileImageRef.current.click()}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{isMyProfile && <EditProfileModal authUser={authUser} />}
								{!isMyProfile && (
									<button
										className='btn btn-outline rounded-full btn-sm'
										onClick={() => followAndUnfollowMutation(user?._id)}
									>
										{isPending && <LoadingSpinnerSmall /> }
										{
											!isPending && amImFollowing ? "Follow" : "Unfollow"
										}
									</button>
								)}
								{(coverImage || profileImage) && (
									<button
										className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
										onClick={handleImageUpdate}
									>
										{  isUpdating  ? "Updating..." : "Update" }
										
									</button>
								)}
							</div>

							<div className='flex flex-col gap-4 mt-14 px-4'>
								<div className='flex flex-col'>
									<span className='font-bold text-lg'>{user?.fullName}</span>
									<span className='text-sm text-slate-500'>@{user?.userName}</span>
									<span className='text-sm my-1'>{user?.bio}</span>
								</div>

								<div className='flex gap-2 flex-wrap'>
									{user?.link && (
										<div className='flex gap-1 items-center '>
											<>
												<FaLink className='w-3 h-3 text-slate-500' />
												<a
													href='https://porfolio-olawumi-olusegun.vercel.app'
													target='_blank'
													rel='noreferrer'
													className='text-sm text-blue-500 hover:underline'
												>
													portfolio
												</a>
											</>
										</div>
									)}
									<div className='flex gap-2 items-center'>
										<IoCalendarOutline className='w-4 h-4 text-slate-500' />
										<span className='text-sm text-slate-500'>{memberSinceData} </span>
									</div>
								</div>
								<div className='flex gap-2'>
									<div className='flex gap-1 items-center'>
										<span className='font-bold text-xs'>{user?.following.length}</span>
										<span className='text-slate-500 text-xs'>Following</span>
									</div>
									<div className='flex gap-1 items-center'>
										<span className='font-bold text-xs'>{user?.followers.length}</span>
										<span className='text-slate-500 text-xs'>Followers</span>
									</div>
								</div>
							</div>
							<div className='flex w-full border-b border-gray-700 mt-4'>
								<div
									className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("posts")}
								>
									Posts
									{feedType === "posts" && (
										<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
									)}
								</div>
								<div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("likes")}
								>
									Likes
									{feedType === "likes" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
									)}
								</div>
							</div>
						</>
					) }
					<Posts feedType={feedType} username={username} userId={user?._id} />
					
				</div>
			</div>
		</>
	);
};
export default ProfilePage;