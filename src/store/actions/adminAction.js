import {
    createNewUserService, deleteUserService, getAllCodeService,
    getAllUsers, updateUserService, getTopDoctorHomeService,
    getAllDoctor, saveDetailDoctorService, getAllSpecialty,
    getAllClinic
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from "react-toastify"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                // console.log('get gender fetch: ', res)
                dispatch(fetchGenderSeccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchGenderSeccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SECCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                // console.log('get position fetch: ', res)
                dispatch(fetchPositionSeccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            dispatch(fetchPositionFailed())
        }
    }

}

export const fetchPositionSeccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SECCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                // console.log('get role fetch: ', res)
                dispatch(fetchRoleSeccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSeccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SECCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            //console.log('check res: ', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user successed!!!")
                // console.log('get role fetch: ', res)
                dispatch(createUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Create a new user failed!!!")
                dispatch(createUserFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            toast.error("Create a new user failed!!!")
            dispatch(createUserFailed())
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers('ALL')
            let res1 = await getTopDoctorHomeService(2)
            //console.log('Check res get doctor: ', res1)
            if (res && res.errCode === 0) {
                // console.log('all users: ', res)

                dispatch(fetchAllUserSeccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSeccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SECCESS,
    data: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("Delete a user seccessed!!!")
                // console.log('get role fetch: ', res)
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Delete a user failed!!!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            toast.error("Delete a user failed!!!")
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data)
            //console.log('data from actions: ', data)
            if (res && res.errCode === 0) {
                toast.success("Update a user seccessed!!!")
                // console.log('get role fetch: ', res)
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Update a user failed!!!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            toast.error("Delete a user failed!!!")
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            //console.log('check fetch doctor: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SECCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED, ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()
            //console.log('check fetch doctor: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SECCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED, ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            //console.log('check fetch doctor: ', res)
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor Seccessed!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SECCESS,
                })
            }
            else {
                toast.error("Save Infor Detail Doctor Failed!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED, ', e)
            toast.error("Save Infor Detail Doctor Failed!!!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            //console.log('check get time from database: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SECCESS,
                    dataTime: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED, ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getAllRequiredData = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            console.log(resClinic)
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getAllRequiredDataSeccess(data))
            }
            else {
                dispatch(getAllRequiredDataFailed())
            }
        } catch (e) {
            // console.log('fetchGenderStart error: ', e)
            dispatch(getAllRequiredDataFailed())
        }
    }
}

export const getAllRequiredDataSeccess = (requiredData) => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DATA_SECCESS,
    data: requiredData
})

export const getAllRequiredDataFailed = () => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DATA_FAILED
})
