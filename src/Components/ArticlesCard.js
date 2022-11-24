export function ArticlesCard({ id, imgArticles, titleArticles, urlArticles, bodyArticles, author }) {
  const style = {}
  return (

    <>
      <a href={urlArticles} target="blank" className="flex justify-center items-center mx-3  ">
        <div style={{ filter: "blur(3px)", backgroundImage: `url(${imgArticles})`, width:"30rem", height:"18rem" }} className="image flex items-end p-2 pr-10 pl-6 border-b border-b-gray-300 gap-1 rounded-t-lg bg-ceca-color-labels">
          {/* <div className="w-96 flex items-center gap-10">

            <img style={{ maxWidth: "87px", cursor: "pointer" }} src={imgArticles} alt="true" className="m-0 pb-1 bg-white rounded-full" />

            <div className="pl-2">
              <small className="font-bold">{titleArticles}</small>
              <br />
              <small>{bodyArticles.slice(0,100)}...</small>
              <p className="font-bold text-right mr-3">Read More</p>
            </div>
          </div> */}

        </div>
        <h1 style={{ textShadow: "2px 2px #000000", width:"25rem", height:"12rem" }} className=" flex flex-col items-center justify-center gap-6 h-24 text-ceca-color-button-color font-bold text-md textOver">{titleArticles} <br />
          <div className="flex justify-between w-full">
            <span style={{ whiteSpace: "no-wrap" }} className=" w-full  text-sm pt-1 font-thin">
              <div className="flex justify-between items-end mt-4 w-full">
                <span className="text-ceca-color-login-background font-bold">Published by <span className="text-ceca-color-button-color">{author}</span></span>
                <span>Read More</span>
              </div>
            </span>
          </div>
        </h1>
      </a>
    </>
  );
}
