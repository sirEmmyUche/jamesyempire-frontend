export const baseUrl = 'http://localhost:3000'

// export const websocketBaseURL = 'http://localhost:3000';

// NB try catch was not use because tanstack query automatically does that.

export const signUp = async (formData)=>{
        const data = await fetch(`${baseUrl}/v1/create-account`,{
                method:'post',
                headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify(formData),
                // credentials: 'include',
        });
        const result = await data.json();
        // console.log('signup', result);
        return result;
}

export const logIn = async (formData)=>{
        const data = await fetch(`${baseUrl}/v1/login`,{
                method:'post',
                headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify(formData),
                // credentials: 'include',
        });
        const result = await data.json();
        // console.log('logIn', result);
        return result;
}


export const  getMyProperty = async (token,id)=>{
    const res = await fetch(`${baseUrl}/v1/my-property?id=${id}`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const getMyChatRequest = async (token)=>{
    const res = await fetch(`${baseUrl}/v1/chat-request`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const geChatRequestById = async (token, chatroomId)=>{
    const res = await fetch(`${baseUrl}/v1/chat?chatroomId=${chatroomId}`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}


export const getAllProperty = async ({page})=>{
    const res = await fetch(`${baseUrl}/v1/property/?page=${page}`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization'
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const getPropertyById = async (id)=>{
    const res = await fetch(`${baseUrl}/v1/property/${id}`,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization'
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const uploadProperty = async (token, formData)=>{
    const res = await fetch(`${baseUrl}/v1/upload-property`,{
        method:'post',
        headers: {
            // 'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${token}`,
        },
        body:formData,
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const updateProperty = async ({token, formData, id})=>{
    const res = await fetch(`${baseUrl}/v1/update-property/${id}`,{
        method:'put',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:formData,
        credentials:'include',
    })
    const data = await res.json();
    return data
}