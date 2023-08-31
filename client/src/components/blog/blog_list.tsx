import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../action/constants";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ADD_BLOG, DISP_BLOG, UPDATE_BLOG } from "../../action/constants";
import { blog } from "../../reducer/blogReducer";

export type bloglistType = {
  blogs: blog[];
  detailblog: blog[];
};
const Blog_list = () => {
  const [blogData, setBlogdata] = useState({
    url: "",
    title: "",
    content: "",
    likes: 0,
    watches: 0,
    user_id: sessionStorage.getItem("userId"),
    user_name: sessionStorage.getItem("userName"),
  });
  const [modalshow, setModalshow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const blog_lists: bloglistType = useAppSelector((state) => state.blog);
  console.log("here", blog_lists.blogs);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/blog`).then((res) =>
      dispatch({
        type: DISP_BLOG,
        payload: res.data.blog,
      })
    );
  }, []);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBlogdata({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogdata({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (localStorage.token) {
      axios
        .post(`${BASE_URL}/api/blog`, blogData)
        .then((res) => {
          console.log("response data", res.data);
          alert("blog successfully added!");
          dispatch({
            type: ADD_BLOG,
            payload: res.data,
          });
          setModalshow(false);
        })
        .catch((err) => {});
    } else {
      alert("invalid user");
      navigate("/login");
    }
  };

  const detail = (itemid: string) => {
    if (localStorage.token) {
      console.log(itemid);
      navigate(`/blog_detail/${itemid}`);
    } else {
      alert("invalid user");
      navigate("/login");
    }
  };
  return (
    <div>
      <div>
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="block mx-auto my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => setModalshow(true)}
        >
          New blog
        </button>

        {modalshow === true && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="container d-flex mx-auto">
                <form
                  onSubmit={onsubmit}
                  className="flex w-full max-w-md space-x-3 mx-auto"
                >
                  <div className="w-full max-w-4xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                      New Blog!
                    </div>
                    <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                      <div className="col-span-2 ">
                        <div className=" relative ">
                          <input
                            type="text"
                            name="url"
                            id="contact-form-name"
                            className=" rounded-lg border-transparent my-4 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="url"
                            onChange={onchange}
                          />
                          <input
                            type="text"
                            name="title"
                            id="contact-form-name"
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="title"
                            onChange={onchange}
                          />
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label className="text-gray-700" htmlFor="name">
                          <textarea
                            className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="comment"
                            placeholder="Type your blog content here"
                            name="content"
                            onChange={handleChange}
                          ></textarea>
                        </label>
                      </div>
                      <div className="col-span-2 text-right flex">
                        <button
                          type="submit"
                          className="py-2 px-4 mx-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          className="py-2 px-4 mx-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          onClick={() => setModalshow(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        <ul className="mx-auto flex flex-wrap justify-center">
          {blog_lists.blogs.map((item, i) => (
            <li className="m-10">
              <div className=" overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
                <a href="#" className="block w-full h-full">
                  <img
                    alt="blog photo"
                    src={item.url}
                    className="object-cover w-full max-h-40"
                  />
                  <div className="w-full p-4 bg-white dark:bg-gray-800">
                    <div>
                      <h5 className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
                        created by: {item.user_name}
                      </h5>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="btn btn-primary text-xs mr-2 py-1.5 px-4 text-gray-600 bg-red-100 rounded-2xl"
                        onClick={() => detail(item._id)}
                      >
                        detail...
                      </button>
                    </div>

                    <h2 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                      title:{item.title}
                    </h2>
                    <div className="flex flex-wrap items-center mt-4 justify-between">
                      <div className="flex flex-wrap items-center mt-4 justify-starts">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 14 14"
                          height="24"
                          width="24"
                        >
                          <path
                            d="M10.5,6.13a2,2,0,0,1,1.59,2.24l-.61,4.27a1,1,0,0,1-1,.86H4a1,1,0,0,1-.93-.63L2,10.21A2,2,0,0,1,3,7.68L4.35,7V2a1.5,1.5,0,0,1,3,0V5.5Z"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>

                        <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-red-100 rounded-2xl">
                          {item.watches}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center mt-4 justify-starts">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 14 14"
                          height="24"
                          width="24"
                        >
                          <g>
                            <polyline
                              points="0.5 7 7 0.5 13.5 7"
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></polyline>
                            <polyline
                              points="2.5 8.5 2.5 13.5 11.5 13.5 11.5 8.5"
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></polyline>
                          </g>
                        </svg>
                        <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                          {item.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Blog_list;
