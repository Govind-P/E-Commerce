
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
    },
    user_Logout:{
        url:`${backendDomain}/api/user-logout`,
        method:'GET'
    },
    all_users:{
        url:`${backendDomain}/api/all-users`,
        method:'GET'
    },
    all_admins:  {
        url:`${backendDomain}/api/all-admins`,
        method:'GET'
    },
    update_user_role:{
        url:`${backendDomain}/api/update-user-role`,
        method:'POST'
    },
    admin_upload_product:{
        url:`${backendDomain}/api/upload-product`,
        method:'POST'
    },
    all_products:{
        url:`${backendDomain}/api/all-products`,
        method:'GET'
    },

}

export default backendApi;