import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import XSvg from "../svgs/XSvg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const Sidebar = () => {
	
	const navigate = useNavigate()

	const queryClient = useQueryClient();

	const { data: authUser } = useQuery({queryKey: ["authUser"]});

	const { mutate: logOutMutation, isPending } = useMutation({
		mutationFn: async () => await apiClient.signOut(),
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/signin", { replace: true })
		},
		onError: (error) => {
			toast.error(error?.message)
		}
	});

	const handleLogout = async (event) => {
		event.preventDefault();
		logOutMutation();
	}

	if(isPending) {
		return <LoadingSpinner />
	}

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start mt-2'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 p-2 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-6 h-6' />
							<span className='text-lg hidden md:block pr-2'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300  p-2 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block pr-2'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.userName}`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300  p-2 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block pr-2'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser?.userName}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] p-2 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser?.profileImage || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-center md:justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate' title={authUser?.fullName}>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.userName}</p>
							</div>
							<button onClick={handleLogout} className="p-3 rounded-full flex items-center justify-center hover:bg-red-800/30 duration-300">
								<BiLogOut
								className='w-5 h-5' />
							</button>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;