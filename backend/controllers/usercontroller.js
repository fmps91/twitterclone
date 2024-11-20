const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const bcrypt = require("bcryptjs");
const v2=require("cloudinary");


const deleteUser= async (req,res)=>{
    const Post = require("../models/postModel");
    const body= req.body;
    
    try {
        
        const user = await User.findOneAndDelete({'username':body['username']});
        console.log("user delete: ",user)
        if (user==null) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user['profileImg']!=''){
            await v2.uploader.destroy(user['profileImg'].split("/").pop().split(".")[0])
        }
        if(user['coverImg']!=''){
            await v2.uploader.destroy(user['coverImg'].split("/").pop().split(".")[0])
        }
       /*  const post = await Post.deleteMany({'user':user._id});
        console.log("posts: ",post)
        await Post.deleteMany({
            comments:{
                user:user._id
            }
        }); */
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in deleteUser", error.message);
        res.status(500).json({error: error.message})
    }
}

const getUserProfile= async (req,res)=>{
    const {username}= req.params;

    try {
        const user = await User.findOne({username}).select("-password");
        if (!user) {
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile", error.message);
        res.status(500).json({error: error.message})
    }
}

const followUnfollowUser= async (req,res)=>{
    try {
        const {id}=req.params;
        const userToModify= await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id===req.user._id.toString()) {
            return res.status(400).json({error: "You can't follow/unfollow yourself"})
        }

        if (!userToModify || !currentUser) {
            return res.status(400).json({error: "User not found"})
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(id,{$pull:{ followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$pull:{ following: id}})
            res.status(200).json({message:"User unfollowed successfully"})
        }else{
            await User.findByIdAndUpdate(id,{$push:{ followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$push:{ following: id}})
            //send notification to the user
            const newNotification= new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save();

            res.status(200).json({message:"User followed successfully"})
        }
    } catch (error) {
        //console.log("Error in followUnfollowUser", error);
        console.log("Error in followUnfollowUser", error.message);
        res.status(500).json({error: error.message})
    }
}

const getSuggestedUsers= async (req,res)=>{
    try {
        const userId= req.user._id

        const usersFollowedByMe = await User.findById(userId).select("following");

        const users= await User.aggregate([
            {$match:{_id: {$ne:userId}}},
            {$sample:{size:10}}
            
        ])
        const filteredUsers = users.filter((user)=>!usersFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0,4);

        suggestedUsers.forEach(user=>user.password=null);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in getSuggestedUsers", error.message);
        res.status(500).json({error: error.message})
    }
}

const updateUser = async(req,res)=>{
    
    
	try {
        const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;
        
        const userId = req.user._id;
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profileImg) {
			if (user.profileImg) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await v2.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await v2.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

		if (coverImg) {
			if (user.coverImg) {
				await v2.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await v2.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error);
		res.status(500).json({ error: error.message });
	}
}

/* const UserUpdate = async(req,res)=>{

	try {
        const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;
        
        const userId = req.user._id;
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profileImg) {
			if (user.profileImg) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

		if (coverImg) {
			if (user.coverImg) {
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error);
		res.status(500).json({ error: error.message });
	}
} */

module.exports={getUserProfile,followUnfollowUser,getSuggestedUsers,updateUser,deleteUser}