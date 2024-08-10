import React, { useState } from 'react'
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { PiSpinnerGapBold } from "react-icons/pi";
import XSvg from '../../../components/svgs/XSvg';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../api';
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { mutate: signInMutation, isError, error, isPending } = useMutation({
		mutationFn: async ({email, password}) => await apiClient.signIn({email, password}),
		onSuccess: () => {
			// toast.success("Sign in successfully");
			setFormData({ email: "", password: "", });
			// queryClient.invalidateQueries({queryKey: ["authUser"]})
			navigate("/")
		},
		onError: (error) => {
			toast.error(error?.message)
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signInMutation(formData)
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	return (
		<div className='w-full p-5 lg:max-w-screen-3xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col w-full' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow bg-transparent px-1.5'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow bg-transparent px-1.5'
							placeholder='Password'
							name='password'
							autoComplete='off'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button disabled={isPending} className={`btn rounded-full btn-primary text-white ${isPending && "opacity-90 cursor-move"}`}>
						{ isPending && <PiSpinnerGapBold className='h-4 w-4 animate-spin' /> }
						<span> Sign In </span>
					</button>
					{isError && <p className='text-red-500'>Something went wrong: {error?.message} </p>}
				</form>
				<div className='w-full flex items-center gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup' className='text-primary text-lg'>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};


export default SignInPage