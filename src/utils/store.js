let state = {
     width: 800,
     height: 600,
};

export const getResolution = () => {
     return { width: state.width, height: state.height };
};

export const setResolution = (newWidth, newHeight) => {
     state = { width: newWidth, height: newHeight };
};
