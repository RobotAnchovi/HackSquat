import { csrfFetch } from './csrf';

//*====> Actions <====
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

//*====> Action Creators <====
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const restoreSession = () => async (dispatch, getState) => {
  if (getState().session.user !== null) return;

  const response = await csrfFetch('/api/auth/');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return;
    dispatch(setUser(data));
  }
};

export const login = (credentials) => async (dispatch) => {
  const response = await csrfFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      ...credentials,
    }),
  });

  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(setUser(data));
};

export const signup = (user) => async (dispatch) => {
  const {
    first_name,
    last_name,
    profile_image_url,
    email,
    username,
    password,
  } = user;
  const formData = new FormData();
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);

  if (profile_image_url)
    formData.append('profile_image_url', profile_image_url);

  const response = await csrfFetch('/api/auth/signup', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(setUser(data));
};

export const updateUser = (user) => async (dispatch) => {
  const {
    first_name,
    last_name,
    profile_image_url,
    email,
    username,
    password,
  } = user;
  const formData = new FormData();
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', password);

  if (profile_image_url)
    formData.append('profile_image_url', profile_image_url);

  const response = await csrfFetch('/api/auth/update', {
    method: 'PUT',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(setUser(data));
};

export const updateUserPassword = (user) => async (dispatch) => {
  const response = await csrfFetch('/api/auth/password', {
    method: 'PUT',
    body: JSON.stringify({
      ...user,
    }),
  });

  const data = await response.json();
  if (!response.ok) return { errors: data };
  dispatch(removeUser());
};

export const deleteUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/auth/delete`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const logout = () => async (dispatch) => {
  await csrfFetch('/api/auth/logout');
  dispatch(removeUser());
};

// Custom selectors
export const sessionUser = (state) => state.session.user;

// Reducer
const initialState = { user: null, emojis: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
  }
}

export default sessionReducer;
