import React, { useState } from 'react'
import XSvg from '../../../components/svgs/XSvg';
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiSpinnerGapBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../api';
import { toast } from "react-hot-toast";

const SignUpPage = () => {

  const [formData, setFormData] = useState({
		email: "",
		userName: "",
		fullName: "",
		password: "",
	});

	const navigate = useNavigate();

	const { mutate: signUpMutation, isError, error, isPending } = useMutation({
		mutationFn: async ({email, userName, fullName, password}) => {
			 await apiClient.signUp({email, userName, fullName, password})
		},
		onSuccess: () => {
			// toast.success("Sign in successfully");
			setFormData({ email: "", password: "", userName: "", fullName: "" })
			navigate("/")
		},
		onError: (error) => {
			toast.error(error?.message)
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signUpMutation(formData)
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


  return (
    <>
    		<div className='w-full p-5 lg:max-w-screen-3xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className=' lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-full mx-auto  flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow bg-transparent'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow bg-transparent'
								placeholder='Username'
								name='userName'
								onChange={handleInputChange}
								value={formData.userName}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow bg-transparent'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow bg-transparent'
							placeholder='Password'
							name='password'
							autoComplete='off'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button disabled={isPending} className='btn rounded-full btn-primary text-white flex items-center gap-1.5'>
						{ isPending && <PiSpinnerGapBold className='h-4 w-4 animate-spin' /> }
						<span>Sign up</span>
					</button>
					{isError && <p className='text-red-500'>Something went wrong: {error?.message} </p>}
				</form>
				<div className='flex items-center w-full gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/signin' className='text-primary text-lg'>
						Sign in
					</Link>
				</div>
			</div>
		</div>
    </>
  )
}

export default SignUpPage