import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import InstructorNav from "../../../../components/instructor_nav";
import InstructorWrapper from "../../../../components/wrapperRoutes/instructorWrapper";
import AddLessonForm from "../../../../components/form/addLessonForm";
import { toast } from "react-toastify";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadVideoText, setUploadVideoText] = useState("Upload lesson video");
  const [uploadProgress, setPogress] = useState(10);

  const router = useRouter();
  const { slug } = router.query;

  //fetch course from backed using slug
  useEffect(() => {
    setLoading(true);
    loadSingleCourse();
    return () => {
      setLoading(true);
    };
  }, [slug]);

  const loadSingleCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
    setLoading(false);
    //   console.log(data);
  };

  //handle lesson video upload to s3
  const handleLessonVideo = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        setUploadVideoText("Upload lesson video");
      } else {
        setUploadVideoText(file.name);
      }
      setUploading(true);
      //send video as form data
      const lessonVideo = new FormData();
      lessonVideo.append("lessonVideo", file);

      //send video to api with pogress trackig by axios
      const { data } = await axios.post(
        "/api/course/lesson-video-upload",
        lessonVideo,
        {
          onUploadProgress: (e) => {
            setPogress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      //successful response back
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Upload Failed, Please try again");
    }
  };

  //handle overall lesson add form submit
  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <InstructorWrapper>
      <InstructorNav />
      {loading ? (
        "Loading.."
      ) : (
        <>
          <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8 ">
              {/* <div>
              <img
                className="w-full h-72 rounded-xl shadow-xl"
                src={course.image.Location}
              />
            </div> */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl text-accent">
                  {course.title}
                </h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-coolGray-400">
                  <div className="flex items-center md:space-x-2">
                    <img
                      src="https://source.unsplash.com/75x75/?portrait"
                      alt=""
                      className="w-4 h-4 border rounded-full dark:bg-coolGray-500 dark:border-coolGray-700"
                    />
                    <p className="text-sm">
                      {course.instructor.name} • {course.createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dark:text-coolGray-500">
                <p>{course.description}</p>
              </div>
            </article>
            <div>
              <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-coolGray-400">
                <p className="px-3 py-1 rounded-md hover:underline bg-primary text-accent">
                  #{course.category}
                </p>
                <p className="px-3 py-1 rounded-md hover:underline bg-accent text-primary">
                  {course.lessons.length} Lessons
                </p>

                {/* Add Lession Modal */}
                <div>
                  <label
                    for="add-lesson-modal"
                    className="border-2 flex align-center items-center text-accent py-1 rounded-md px-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Add Lesson
                  </label>
                  <input
                    type="checkbox"
                    id="add-lesson-modal"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box overflow-scroll">
                      <AddLessonForm
                        handleAdd={handleAddLesson}
                        values={values}
                        setValues={setValues}
                        uploading={uploading}
                        course={course}
                        uploadVideoText={uploadVideoText}
                        handleLessonVideo={handleLessonVideo}
                        uploadProgress={uploadProgress}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
    </InstructorWrapper>
  );
};
export default CourseView;
