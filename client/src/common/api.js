const backendDomain = 'http://localhost:8001';

const backendApi={
    signup:{
        url: `${backendDomain}/api/register`,
        method: 'POST'
    },
    login:{
        url: `${backendDomain}/api/login`,
        method: 'POST'
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:'GET'
    }
}

export default backendApi;