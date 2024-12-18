import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const Sidebar = () => {
	
	
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") === "black" ? localStorage.getItem("theme") : "ligth"
	  );
    const queryClient = useQueryClient();

    const {mutate:logout,isPending,isError,error}=useMutation({
        mutationFn:async()=>{
            try {
                const res= await fetch("/api/auth/logout",{
                    method:"POST",
                })

                const data=await res.json();

                if(data.error) return null;
                if(!res.ok) throw new Error(error);
                
            } catch (error) {
                throw new Error(error);
                
            }
        },
        onSuccess:()=>{
            toast.success("Logout successfully")
            queryClient.invalidateQueries({queryKey:["authUser"]})
			//const navigate = useNavigate();
			//navigate('/login');
			location.reload()
			
        },
        onError:()=>{
            toast.error("Logout failed")
        }
    })
    
    const {data:authUser} = useQuery({queryKey:["authUser"]});
    //console.log("auth in sidebar",authUser);

	


	//hover:bg-stone-900
	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
			<div className='grid justify-items-center'></div>
				
				<Link to='/' className='flex justify-center md:justify-start'>
				
					<XSvg className='px-2 w-12 h-12 rounded-full btn-twitter ' />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className=' flex gap-3 items-center hover:bg-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 items-center hover:bg-secondary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<div className='mt-auto mb-10 flex gap-2  transition-all duration-300 hover:bg-secondary py-2 px-4 rounded-full'>
					<Link
						to={`/profile/${authUser.username}`}
						className='mt-auto flex gap-2  transition-all duration-300 hover:bg-secondary py-2 px-2 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className=' font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
								<p className=' text-sm'>@{authUser?.username}</p>
							</div>
							
							
						</div>
					</Link>
					<BiLogOut   className='w-8 h-12 cursor-pointer' 
                            onClick={(e)=>{
                                e.preventDefault()
                                logout();
							

                            }}
                            />
					</div>
					
				)}
			</div>
		</div>
	);
};
export default Sidebar;