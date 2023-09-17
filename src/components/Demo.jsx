import { useEffect, useState } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useGetVideoSummaryMutation } from "../services/summary";
const Demo = () => {
  const [video, setVideo] = useState({
    url: "",
    summary: "",
  });

  const [allVideos, setAllVideos] = useState([]);

  const [copied, setCopied] = useState("");

  // RTK mutation hook
  const [getVideoSummary, { error, isLoading }] = useGetVideoSummaryMutation();

  useEffect(() => {
    const videosFromLocalStorage = JSON.parse(
      localStorage.getItem("allVideos")
    );
    if (videosFromLocalStorage) {
      setAllVideos(videosFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await getVideoSummary(video.url);

    if (response.data != null) {
      const newVideo = { ...video, summary: response.data.summary.text };

      const updatedAllVideos = [newVideo, ...allVideos];

      // update state and local storage
      setVideo(newVideo);
      setAllVideos(updatedAllVideos);

      localStorage.setItem("allVideos", JSON.stringify(updatedAllVideos));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);

    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="my-16 w-full max-w-xl">
      <div className="flex flex-col gap-2 w-full">
        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className=" absolute left-0 ml-3 my-4 w-5 "
          />

          <input
            type="url"
            placeholder="Paste the youtube video url"
            value={video.url}
            onChange={(e) => {
              setVideo({ ...video, url: e.target.value });
            }}
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}

        <div className="flex flex-col w-full gap-1  max-h-60"></div>

        {allVideos.reverse().map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => setVideo(item)}
            className="link_card"
          >
            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
              <img
                src={copied === item.url ? tick : copy}
                alt={copied === item.url ? "tick_icon" : "copy_icon"}
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <p
              className="flex-1 font-satoshi font-medium text-sm truncate"
              style={{ color: "#6A5083" }}
            >
              {item.url}
            </p>
          </div>
        ))}

        {/* Display Result */}

        <div className=" my-4 max-w-full flex  justify-center items-center  "></div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[100px] w-full">
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          </div>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Oops! Something went wrong...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          video.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Youtube Video <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {video.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
