
export const signIn = async ({email, password}) => {

    try {
        
        const response = await fetch("/api/v1/auth/sign-in", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
  
        return responseBody;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const signUp = async ({email, password, fullName, userName}) => {

    try {
 
        const response = await fetch("/api/v1/auth/sign-up", {
            method: "POST",
            body: JSON.stringify({email, password, fullName, userName}),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }

        return responseBody;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const signOut = async () => {
    try {
        const response = await fetch("/api/v1/auth/sign-out", {
            method: "POST",
            credentials: "include"
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }

        return responseBody;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const getLoggedInUser = async () => {

    try {
        
        const response = await fetch("/api/v1/auth/me", {
            method: "GET",
            credentials: "include"
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

// POSTS

export const getPosts = async (postUrl) => {

    try {
        
        const response = await fetch(postUrl, {
            method: "GET",
            credentials: "include"
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const deletePost = async (postId) => {

    try {
        
        const response = await fetch(`/api/v1/posts/${postId}`, {
            method: "DELETE",
            credentials: "include"
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const createPost = async ({text, image}) => {

    try {
        
        const response = await fetch(`/api/v1/posts/create`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({text, image}),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const suggestedUsers = async () => {

    try {
        
        const response = await fetch(`/api/v1/users/suggested`, {
            method: "GET",
            credentials: "include",
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const followAndUnfollow = async (userId) => {

    try {
        
        const response = await fetch(`/api/v1/users/follow/${userId}`, {
            method: "GET",
            credentials: "include",
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const likeAndUnlikePost = async (postId) => {

    try {

        const response = await fetch(`/api/v1/posts/like/${postId}`, {
            method: "GET",
            credentials: "include",
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const commentPost = async (postId, comment) => {

    try {
        
        const response = await fetch(`/api/v1/posts/comment/${postId}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ comment }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        console.log(error)
        throw new Error(error?.message)
    }
}

export const allNotifications = async () => {

    try {
        
        const response = await fetch(`/api/v1/notifications`, {
            method: "GET",
            credentials: "include",
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const deleteNotifications = async () => {

    try {
        
        const response = await fetch(`/api/v1/notifications`, {
            method: "DELETE",
            credentials: "include",
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const userProfile = async (userName) => {


    try {
        
        const response = await fetch(`/api/v1/users/profile/${userName}`, {
            method: "GET",
            credentials: "include",
        });

        const responseBody = await response.json();


        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

export const updateProfile = async (formData) => {

    try {

        const response = await fetch(`/api/v1/users/update-profile`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseBody = await response.json();

        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody?.data;

    } catch (error) {
        throw new Error(error?.message)
    }
}

const apiClient = {
    signIn,
    signUp,
    signOut,
    getLoggedInUser,
    getPosts,
    deletePost,
    createPost,
    suggestedUsers,
    followAndUnfollow,
    likeAndUnlikePost,
    commentPost,
    allNotifications,
    deleteNotifications,
    userProfile,
    updateProfile,
}

export default apiClient;