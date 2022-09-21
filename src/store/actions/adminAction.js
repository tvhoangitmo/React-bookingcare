import { createNewUserService, deleteUserService, getAllCodeService, getAllUsers, updateUserService } from '../../services/userService';
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
            console.log('data from actions: ', data)
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
