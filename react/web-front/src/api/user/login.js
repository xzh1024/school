import axiosInstance from '../../utils/fetch';

const loginApi = {
    login: (username, password) => axiosInstance.post('/user/jwt/token', { username, password }),
    userInfo: (token) => axiosInstance.get(`/user/common/userInfo?token=${token}`)
}

export default loginApi