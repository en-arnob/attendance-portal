import Layout from "../components/Layout"
import { AiOutlineMail, AiFillGithub } from "react-icons/ai";
import { FaCode } from "react-icons/fa";


const PageIndex = () => {
  return (
    <Layout>
      <div className="container mt-2 p-2">
        <h1 className="is-flex is-align-items-center">
          <span className="icon mr-2">
            <FaCode size={24} />
          </span>
          Khalid Utsob
        </h1>
        <h1 className="is-flex is-align-items-center">
          <span className="icon mr-2">
            <AiFillGithub size={24} />
          </span>
          <a
            href="https://github.com/en-arnob"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/en-arnob
          </a>
        </h1>
        <h1 className="is-flex is-align-items-center">
          <span className="icon mr-2">
            <AiOutlineMail size={24} />
          </span>
          <a href="mailto:en.arnob@gmail.com">en.arnob@gmail.com</a>
        </h1>
      </div>
    </Layout>
  );
}

export default PageIndex;