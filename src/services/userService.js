import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const updateUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputtype) => {
    return axios.get(`/api/allcode?type=${inputtype}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}

const getDetailInforDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor?doctorId=${doctorId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}


const getScheduleDoctorByDate = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`)
}

const getExtraInforDoctor = (id) => {
    return axios.get(`/api/get-extra-infor-doctor?doctorId=${id}`)
}

const getInforDoctor = (id) => {
    return axios.get(`/api/get-infor-doctor-for-modal?doctorId=${id}`)
}

const saveInforPatient = (data) => {
    return axios.post(`/api/patient-booking-appointment`, data)
}

const postVerifyBookingAppoiment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}

const getDetailClinic = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-doctor-booking-by-date?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemery = (data) => {
    return axios.post(`/api/send-remedy`, data)
}
const createNewHandBook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}

const getAllHandBook = () => {
    return axios.get('/api/get-all-handbook')
}

const getHandBookById = (id) => {
    return axios.get(`/api/get-handbook-by-id?id=${id}`)
}

const getHistory = (email) => {
    return axios.get(`/api/get-history?email=${email}`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    updateUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctor,
    getInforDoctor,
    saveInforPatient,
    postVerifyBookingAppoiment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    createNewClinic,
    getAllClinic,
    getDetailClinic,
    getAllPatientForDoctor,
    postSendRemery,
    createNewHandBook,
    getAllHandBook,
    getHandBookById,
    getHistory
}