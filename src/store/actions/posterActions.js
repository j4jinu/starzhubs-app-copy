import {
    FETCH_POSTER_REQUEST,
    FETTCH_POSTER_SUCCESS,
    FETCH_POSTER_FAIL
} from '../constants'

import api from '../../api/api'

export const fetchPosters = () => {
    return {
        type: FETCH_POSTER_REQUEST
    }
}

export const userFetchPosters = () => {
    return {
        type: FETCH_POSTER_REQUEST
    }
}