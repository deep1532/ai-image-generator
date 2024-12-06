import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);

      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmithandler}
      className="flex flex-col justify-center items-center min-h-[90vh]"
    >
      <div>
        <div className="relative">
          <img src={image} alt="Result Image" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            } `}
          />
        </div>

        <p className={loading ? "" : "hidden"}>Loading...</p>
      </div>

      {isImageLoaded ? (
        <div className="flex gap-2 flex-wrap justify-center rounded-full text-white text-sm mt-10 p-0.5">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900  text-black cursor-pointer rounded-full px-8 py-3"
          >
            Generate another
          </p>

          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      ) : (
        <div className="flex w-full max-w-xl text-white bg-neutral-500 rounded-full text-sm mt-10 p-0.5">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
