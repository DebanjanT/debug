import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import InstructorWrapper from "../../../components/wrapperRoutes/instructorWrapper";
import { Context } from "../../../context";
import InstructorNav from "../../../components/instructor_nav";
import axios from "axios";
import CreateCourseForm from "../../../components/form/createCourseForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import DrawerWrapper from "../../../components/wrapperRoutes/DrawerWrapper";

const createCourse = () => {
  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  //course details structure , defining default values
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    price: 500,
    paid: true,
    uploading: false,
    loading: false,
  });

  //to display image preview
  const [imgPreview, setImgPreview] = useState("");

  //image state for storing resized image
  const [image, setImage] = useState({});

  //handling value changes on form
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //handle image upload from form, resize, and upload to aws s3
  const handleImageUpload = (e) => {
    let user_uploaded_image = e.target.files[0];
    setImgPreview(window.URL.createObjectURL(user_uploaded_image));
    setValues({ ...values, loading: true });

    //resizing image from client side
    Resizer.imageFileResizer(
      user_uploaded_image,
      720,
      500,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          const { data } = await axios.post("/api/course/image-upload", {
            image: uri,
          });
          setImage(data);
          // console.log(uploadProgress);
          setValues({ ...values, loading: false });
          console.log(data);
        } catch (err) {
          console.log(err);
          setValues({ ...values, loading: false });
          toast.error("Image upload failed! Contact suppot team ❤️");
        }
      }
    );
  };

  
  const removeCourseImage = async () => {
    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.post("/api/course/image-remove", { image });
      setImage({});
      setImgPreview("");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Problem removing image , Contact Support");
    }
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(values.paid == false) {
        setValues({...values, price: 0})
      }
      const { data } = await axios.post("/api/course/create-new-course", {
        ...values,
        image,
      });
      router.push("/instructor");
      toast.success("Continue adding lessions");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <InstructorWrapper>
      <DrawerWrapper>
        <InstructorNav />

        {/* breadcrumbs */}
        <div className="text-sm breadcrumbs w-4/5 mx-auto flex justify-center -mt-3">
          <ul>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Instructor Dashboard
              </a>
            </li>

            <li className="text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Create New course
            </li>
          </ul>
        </div>

        <div className="mx-auto w-full">
          <h1 className="text-center mt-4 mb-3 text-xl  text-accent">
            Create Your Course
          </h1>

          {/* course creation form */}
          <div className="grid grid-col-1 lg:grid-cols-3 gap-2  ">
            <div className="col-span-1 pl-4 ">
              <p className="text-gray-500">
                Please read community guidelines carefully before creating
                courses
              </p>
            </div>
            {/* course creation form component */}
            <CreateCourseForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleImageUpload={handleImageUpload}
              values={values}
              setValues={setValues}
              imgPreview={imgPreview}
              removeCourseImage={removeCourseImage}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <hr />
            <pre>{JSON.stringify(image, null, 4)}</pre>
          </div>
        </div>
      </DrawerWrapper>
    </InstructorWrapper>
  );
};

export default createCourse;
