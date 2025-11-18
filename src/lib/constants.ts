export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const SIGNUP_URL = `${API_BASE}/api/users/signup/`;
export const LOGIN_URL = `${API_BASE}/api/auth/login/`;
export const ME_URL = `${API_BASE}/api/users/me/`;
export const CHANGE_PASSWORD_URL = `${API_BASE}/api/users/change-password/`;



export const GET_TODOS_URL =`${API_BASE}/api/todos/`
export const POST_TODOS_URL =`${API_BASE}/api/todos/`
export const UPDATE_TODOS_URL =`${API_BASE}/api/todos/:id/`
export const DELETE_TODOS_URL =`${API_BASE}/api/todos/:id/`
