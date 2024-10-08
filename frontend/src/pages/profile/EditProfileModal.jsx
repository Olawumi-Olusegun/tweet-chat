import { useEffect, useState } from "react";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const EditProfileModal = ({authUser}) => {
	const [formData, setFormData] = useState({
		fullName: "",
		userName: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const {updateProfileMutation, isUpdating } = useUpdateProfile()

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleProfileUpdate = async (event) => {
		event.preventDefault();
		if(isUpdating) return;
		await updateProfileMutation(formData);
		setFormData({
			fullName: "",
			userName: "",
			email: "",
			bio: "",
			link: "",
			newPassword: "",
			currentPassword: "",
		});
	}

	useEffect(() => {
		if(authUser) {
			setFormData({
				fullName: authUser.fullName || "",
				userName: authUser.userName || "",
				email: authUser.email || "",
				bio: authUser.bio || "",
				link: authUser.link || "",
				newPassword: "",
				currentPassword: "",
			})
		}
	}, [authUser])

	return (
		<>
			<button
				className='btn btn-outline rounded-full btn-sm'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md'>
					<h3 className='font-bold text-lg my-3'>Update Profile</h3>
					<form className='flex flex-col gap-4' onSubmit={handleProfileUpdate} >
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.fullName}
								name='fullName'
								onChange={handleInputChange}
							/>
							<input
								type='text'
								placeholder='Username'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.userName}
								name='userName'
								onChange={handleInputChange}
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='email'
								placeholder='Email'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.email}
								name='email'
								onChange={handleInputChange}
							/>

						<input
							type='text'
							placeholder='Link'
							className='flex-1 input border border-gray-700 rounded p-2 input-md'
							value={formData.link}
							name='link'
							onChange={handleInputChange}
						/>
						
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='password'
								placeholder='Current Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.currentPassword}
								autoComplete="off"
								name='currentPassword'
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='New Password'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.newPassword}
								autoComplete="off"
								name='newPassword'
								onChange={handleInputChange}
							/>
						</div>
						<textarea
								placeholder='Bio'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
								value={formData.bio}
								name='bio'
								onChange={handleInputChange}
							/>
						<button type="submit" className='btn btn-primary rounded-full btn-sm text-white'>
						{  isUpdating  ? "Updating..." : "Update" }
						</button>
					</form>
				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default EditProfileModal;