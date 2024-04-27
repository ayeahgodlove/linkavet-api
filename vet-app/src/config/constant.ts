// export const API_URL = "http://localhost:8000"
export const API_URL = "https://linkavet.com";
export const API_URL_UPLOADS_POSTS = `${API_URL}/uploads/posts`;
export const API_URL_UPLOADS_DOCUMENTS = `${API_URL}/uploads/document`;
export const API_URL_UPLOADS_EVENTS = `${API_URL}/uploads/events`;
export const API_URL_UPLOADS_PROJECTS = `${API_URL}/uploads/projects`;
export const  API_URL_UPLOADS_BANNERS = `${API_URL}/uploads/banners`
export const  API_URL_UPLOADS_STORES = `${API_URL}/uploads/stores`
export const  API_URL_UPLOADS_PRODUCTS = `${API_URL}/uploads/products`
export const  API_URL_UPLOADS_COURSES = `${API_URL}/uploads/courses`
export const  API_URL_UPLOADS_AVATARS = `${API_URL}/uploads/avatars`

export const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  

  export const ROLES = {
    ADMIN: "ADMIN", // post products
    DOCTOR: "DOCTOR", //review appointments
    CREATOR: "CREATOR", //posting articles, 
    PETOWNER: "PETOWNER", //or USERS make appointments
    TRAINER: "TRAINER",
  }