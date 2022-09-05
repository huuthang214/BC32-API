function apiGetUsers() {
    return axios({
        url : 'https://62fdf0cb41165d66bfb4b14f.mockapi.io/Users',
        method : 'GET',
    })
}

function apiGetUsersID(id) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Users/${id}`,
        method : 'GET'
    })
}

function apiUpdateUsers(userId, user) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Users/${userId}`,
        method : 'PUT',
        data : user,
    })
}

function apiAddUsers(user) {
    return axios({
        url : 'https://62fdf0cb41165d66bfb4b14f.mockapi.io/Users',
        method : 'POST', 
        data : user,
    })
}

function apiDeleteUsers(id) {
    return axios({
        url : `https://62fdf0cb41165d66bfb4b14f.mockapi.io/Users/${id}`,
        method : 'DELETE',
    })
}