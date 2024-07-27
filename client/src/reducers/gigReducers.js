const authData = JSON.parse(localStorage.getItem("persist:root"));

let userId = null;

if (authData) {
  try {
    const parsedAuthData = JSON.parse(authData.auth); // auth is a string in authData
    userId = parsedAuthData.user ? parsedAuthData.user._id : null;
  } catch (error) {
    console.error("Error parsing auth data:", error);
  }
}

console.log(userId);

export const INITIAL_STATE = {
  userId: userId,
  title: "",
  cat: "",
  coverImg: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: "",
  revisionNumber: "",
  features: [],
  price: 0,
};

export const gigReducers = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };

    case "ADD_IMAGES":
      return {
        ...state,
        coverImg: action.payload.coverImg,
        images: action.payload.images,
      };

    case "ADD_FEATURES":
      return {
        ...state,
        features: [...state.features, action.payload],
      };

    case "REMOVE_FEATURES":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
