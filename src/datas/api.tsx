export const endpoints = {
    login: "api/user/login",
    register: "api/user/register",
    auth: "api/user/auth",
    logout: "api/user/logout"
}


/**
 * Function that centralizes fetch requests.
    The request method is detected automatically
    She works with the above endpoints.
 * @param endpoint property of above endpoints
 * @param datas object for method POST body
 * @returns result of request (will probably change to update the context)
 */
export  function requestAPI(endpoint: string, datas?: Object, id?: string){
    let url = `http://localhost:8080/${endpoint}`;
    let token = localStorage.getItem('xsrfToken')

    let options: RequestInit = {
        method: "GET",
        credentials: 'include', // enable cookie
        headers: {
            "Content-Type": "application/json",
          },
    }
    if(token){
        token = JSON.parse(token) 
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    }
    if(id){
        url = url.replace('{id}', id);
    }

    if(datas){
        options.method = 'POST';
        options.body = JSON.stringify(datas);
    } 
    
    if(endpoint === endpoints.logout){
        options.cache = 'no-store';
    }
    
    return fetch(url, options)
}
        
        
    
