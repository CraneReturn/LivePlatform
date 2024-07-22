const getters = {
  token: (state: { user: { token: any } }) => state.user.token,
  userId: (state: { user: { userId: any } }) => state.user.userId,
  avatar: (state: { user: { avatar: any } }) => state.user.avatar,
  userName: (state: { user: { userName: any } }) => state.user.userName,
  introduction: (state: { user: { introduction: any } }) =>
    state.user.introduction,
  roles: (state: { user: { roles: any } }) => state.user.roles,
};
export default getters;
