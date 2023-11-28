import { useState } from "react";
import axios from "axios";
import Header from "./header";
import "./App.css";

export default function Githubuser() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [repo, setRepo] = useState([]);

  console.log(username);

  const UserData = async () => {
    try {
      const dataResponce = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserInfo(dataResponce.data);
      setError(null);

      const getRepo = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepo(getRepo.data);

      console.log(userInfo);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found, Please check the username.");
      } else {
        setError("error");
      }
    }
  };
  return (
    <>
      <div className="search   flex justify-center items-center mt-5 text-white ">
        <input
          type="text"
          value={username}
          placeholder="Input Name Here..."
          onChange={(e) => setUsername(e.target.value)}
          className=" h-8 rounded-2xl  border-2 border-[#27374D] outline-none bg-transparent px-2"
        />
        <span>
          <button
            onClick={UserData}
            className="text-[#DDE6ED] h-8 px-2 rounded-2xl  border-[#27374D] border-2 ml-5">
            Search
          </button>
        </span>
      </div>

      {error ? (
        <p className="text-lg font-bold text-red-900 ">{error}</p>
      ) : userInfo ? (
        <div className="flex flex-col  mx-5 md:grid md:grid-flow-col">
          <div className="text-white flex flex-col  text-xl justify-start md:flex-col w-full md:items-start md:space-y-5 ">
            <h3 className="text-2xl text-[#27374D] font-bold my-10   ">
              Overview
            </h3>
            <div className="">
              <p className="w-28 h-auto  md:w-64">
                <img src={userInfo.avatar_url} className="rounded-full" />
              </p>
              <div className="flex flex-col md:ml-5 md:mt-5 md:text-2xl">
                <p>{userInfo.login}</p>
                <p>{userInfo.name}</p>
              </div>
            </div>

            <div className="text-white flex  mt-5 space-x-5">
              {/* <p>ID : {userInfo.id}</p> */}
              <p>Followers : {userInfo.followers}</p>
              <p>Following : {userInfo.following}</p>
            </div>
          </div>

          <div className="space-y-10 md:ml-10 mt-10">
            <h3 className="text-3xl text-white   ">Repository </h3>

            <ol className="text-blue-700 gap-5 md:grid md:grid-cols-2 space-y-5 md:space-y-0">
              {repo.map((r) => (
                <li
                  key={r.id}
                  className="border-2 border-[#526D82] h-20 rounded-lg flex items-center px-5">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {r.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p className="text-[#27374D] text-xl font-bold mt-10">
          You have not searched a user
        </p>
      )}
    </>
  );
}
