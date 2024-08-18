import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function About() {
  const location1 = useLocation();

  useEffect(() => {
    if (location1.pathname === "/about") {
      toast("Want to know More About Us? Contact Us");
    }
  }, [location1.pathname]);

  return (
    <div className="py-16 bg-white">
      <ToastContainer />
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="About Us"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Empowering Task Management with a Seamless User Experience
            </h2>
            <p className="mt-6 text-gray-600">
              Our TODO application is meticulously developed by a dedicated team
              of developers who are passionate about creating seamless digital
              experiences. We understand the importance of effective task
              management, which is why every feature in this app is designed
              with the user in mind.
            </p>
            <p className="mt-4 text-gray-600">
              With a focus on simplicity and efficiency, our app provides a
              robust platform for organizing your tasks, no matter how big or
              small. Built using the latest web technologies, it ensures a
              smooth and responsive experience. We are committed to continuously
              enhancing the app, driven by user feedback and the evolving needs
              of our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
