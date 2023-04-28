const get = async (URL) => {
    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("TOKEN")
        }
    }).then(response => response.json());

    if (res.auth == false) {
        localStorage.clear();
        window.location.reload();
    }

    return res;
}

const post = async (URL, data) => {
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem("TOKEN")
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

    if (res.auth == false) {
        localStorage.clear();
        window.location.reload();
    }

    return res;
}

export const handleRegister = async (data) => {
    const res = await post("/users/register", data)
    return res;
}

export const getAllRoles = async () => {
    const res = await get("/roles/list");
    return res;
}

export const handleGetSessionToken = async (data) => {
    const res = await post("/users/login", data)
    return res;
}

export const searchUsers = async (filter) => {
    const res = await get(`/users/usersearch/${filter}`);
    return res;
}

export const getAllUsers = async () => {
    const res = await get("/users/list");
    return res;
}

export const getUserByID = async (id) => {
    const res = await get(`/users/getbyid/${id}`);
    return res;
}

export const getUserExtensionDataByID = async (id) => {
    const res = await get(`/users/GetExtensionByID/${id}`);
    return res;
}

export const setUserExtensionDataByID = async (data) => {
    const res = await post("/users/SetExtensionByID", data)
    return res;
}

export const getAssignedUsers = async (id) => {
    const res = await get(`/users/getassigned/${id}`);
    return res;
}

export const getAssignedUsersByEmployer = async (id) => {
    const res = await get(`/users/getassignedemployer/${id}`);
    return res;
}

export const setAssigned = async (data) => {
    const res = await post("/users/assign", data)
    return res;
}

export const GetApplications = async (jobid) => {
    const res = await get(`/jobs/getapplications/${jobid}`);
    return res;
}

export const SetApplications = async (data) => {
    const res = await post("/jobs/setapplications", data)
    return res;
}

export const FilterJobs = async (filter) => {
    const res = await get(`/jobs/FilterJobs/${filter}`);
    return res;
}

export const FilterJobsByEmployer = async (userid, filter) => {
    const res = await get(`/jobs/filteremployerjobs/${userid}/${filter}`);
    return res;
}

export const SetJobs = async (data) => {
    const res = await post("/jobs/SetJobs", data)
    return res;
}

export function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}