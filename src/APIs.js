export const baseUrl = 'http://localhost:3000'
// export const baseUrl = 'https://jamesyempire-backend.onrender.com'

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

export const changePassword = async (token,formData)=>{
        const data = await fetch(`${baseUrl}/v1/account/change-password`,{
                method:'post',
                headers: {
                        'Content-Type': 'application/json',
                         "Authorization": `Bearer ${token}`,
                    },
                body: JSON.stringify(formData),
                // credentials: 'include',
        });
        const result = await data.json();
        // console.log('logIn', result);
        return result;
}

export const updateAccount = async (token,formData)=>{
        const data = await fetch(`${baseUrl}/v1/update-account`,{
                method:'post',
                headers: {
                         "Authorization": `Bearer ${token}`,
                    },
                body: formData,
                // credentials: 'include',
        });
        const result = await data.json();
        // console.log('logIn', result);
        return result;
}



export const getMyProperty = async ({ token, id, page }) => {
  const res = await fetch(
    `${baseUrl}/v1/my-property?page=${page}&id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    }
  )
  return res.json()
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


// APIs.js
export const searchProperty = async (params = {}) => {

    function cleanParams(params) {
        return Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
        )
    }
    const query = new URLSearchParams(cleanParams(params)).toString()

    // const query = new URLSearchParams(params).toString()
    const url = `${baseUrl}/v1/search-property?${query}`

    const res = await fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    })

    const data = await res.json()
    return data
}

export const deletePropertyById = async (id,token)=>{
    const res = await fetch(`${baseUrl}/v1/remove-property/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials:'include',
    })
    const data = await res.json();
    return data
}

export const deleteImageFromPropertyImage = async ({id,token,formData})=>{
    const res = await fetch(`${baseUrl}/v1/remove-image-from-property-image/${id}?imageUrl=${formData}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        // body: JSON.stringify(formData),
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