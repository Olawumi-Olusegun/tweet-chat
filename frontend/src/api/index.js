
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
        // console.log(responseBody)
        if(!responseBody.success) return null;
        if(!response.ok) {
            throw new Error(responseBody?.message)
        }
      
        return responseBody;

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
      
        return responseBody;

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

const apiClient = {
    signIn,
    signUp,
    signOut,
    getLoggedInUser,
    getPosts,
    deletePost,
    createPost,
}

export default apiClient;