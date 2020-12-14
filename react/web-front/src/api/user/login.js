import axiosInstance from '../../utils/fetch';

const loginApi = {
    login: (username, password) => axiosInstance.post('/user/token', { username, password }),
    userInfo: (token) => axiosInstance.get(`/user/userInfo?token=${token}`)
}

export default loginApi