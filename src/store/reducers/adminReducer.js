import actionTypes from '../actions/actionTypes';
import { getAllCodeService } from '../../services/userService';
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    requiredData: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            {
                let copyState = { ...state }
                copyState.isLoadingGender = true
                // console.log('test redux start: ', action)
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_GENDER_SECCESS:
            {
                let copyState = { ...state }
                copyState.genders = action.data
                copyState.isLoadingGender = false
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_GENDER_FAILED:
            {
                let copyState = { ...state }
                copyState.genders = []
                copyState.isLoadingGender = false
                return {
                    ...copyState,
                }
            }

        case actionTypes.FETCH_POSITION_SECCESS:
            {
                let copyState = { ...state }
                copyState.positions = action.data
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_POSITION_FAILED:
            {
                let copyState = { ...state }
                copyState.positions = []
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ROLE_SECCESS:
            {
                let copyState = { ...state }
                copyState.roles = action.data
                copyState.isLoadingGender = false
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ROLE_FAILED:
            {
                let copyState = { ...state }
                copyState.roles = []
                return {
                    ...copyState,
                }
            }

        case actionTypes.FETCH_ALL_USERS_SECCESS:
            {
                let copyState = { ...state }
                // console.log('check actions: ', action)
                copyState.users = action.data
                return {
                    ...copyState
                }
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            {
                let copyState = { ...state }
                copyState.users = []
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_TOP_DOCTOR_SECCESS:
            {
                let copyState = { ...state }
                copyState.topDoctors = action.dataDoctors
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            {
                let copyState = { ...state }
                copyState.topDoctors = []
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALL_DOCTOR_SECCESS:
            {
                let copyState = { ...state }
                copyState.allDoctors = action.dataDoctors
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            {
                let copyState = { ...state }
                copyState.allDoctors = []
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SECCESS:
            {
                let copyState = { ...state }
                copyState.allScheduleTime = action.dataTime
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            {
                let copyState = { ...state }
                copyState.allScheduleTime = []
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALL_REQUIRED_DATA_SECCESS:
            {
                let copyState = { ...state }
                copyState.requiredData = action.data
                return {
                    ...copyState,
                }
            }
        case actionTypes.FETCH_ALL_REQUIRED_DATA_FAILED:
            {
                let copyState = { ...state }
                copyState.requiredData = []
                return {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default adminReducer;