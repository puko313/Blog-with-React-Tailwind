import {
  ADD_BLOG,
  DISP_BLOG,
  UPDATE_BLOG,
  DETAIL_BLOG,
} from "../action/constants";
export interface blog {
  _id: string;
  title: string;
  content: string;
  likes: number;
  watches: number;
  user_id: string;
  user_name: string;
  url: string;
}

interface Actiontype {
  type: string;
  payload: Object;
}

const initialState = {
  blogs: [],
  detailblog: [],
};

export default function (state = initialState, action: Actiontype) {
  switch (action.type) {
    case DISP_BLOG:
      state.blogs = [];
      return {
        ...state,
        blogs: action.payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case DETAIL_BLOG:
      state.detailblog = [];
      return {
        ...state,
        detailblog: [action.payload],
      };
    default:
      return state;
  }
}
