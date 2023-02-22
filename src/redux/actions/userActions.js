export const SET_USER = 'SET_USER'

export const setUser = accessToken => {
    localStorage.setItem('accessToken', accessToken)
    
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    return async (dispatch, getState) => {
        const baseEndpoint = process.env.REACT_APP_BE_DEV
        const res = await fetch(`${baseEndpoint}/users/me`, options)

        const { user } = await res.json()
        dispatch({
            type: SET_USER,
            payload: user
        }) 
    }
    
}