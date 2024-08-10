
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

        if(!responseBody.success) return null;
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
}

export default apiClient;