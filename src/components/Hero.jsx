import { brand_logo } from "../assets/index";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full flex justify-between items-center mb-10 pt-3">
        <div className="flex flex-row  items-center ">
          <img
            src={brand_logo}
            alt="TubeDigest_Logo"
            className=" object-contain   w-16  h-8"
          />
          <h3 className="  text-lg font-extrabold leading-[1.15] text-black sm:text-xl text-center ">
            TubeDigest
          </h3>
        </div>

        <button
          type="button"
          onClick={() => window.open("https://github.com/ankitRay1", "_blank")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        {" "}
        Simplify YouTube Videos with <br className=" max-mid:hidden" />{" "}
        <span className="tubedigest_gradient">TubeDigest</span>{" "}
      </h1>
      <h2 className="desc">
        TubeDigest, an open-source video summarizer that converts extensive
        YouTube video transcripts into simple and short overviews, will help you
        simplify your viewing.
      </h2>
    </header>
  );
};

export default Hero;
