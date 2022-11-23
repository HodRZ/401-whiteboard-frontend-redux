

export const isAuthorized = (modelAuthorId, loggedUser) => {
    return ((modelAuthorId === loggedUser.id) ||
        (loggedUser.roles === 'admin'));
};