import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPortfolioByUser } from "../api/portfolioAPI"
import { MdKeyboardDoubleArrowRight, MdKeyboardArrowRight  } from "react-icons/md";
import { BiLogoGoLang, BiLogoJavascript, BiLogoJava, BiLogoHtml5, BiLogoCPlusPlus  } from "react-icons/bi";
import { getUser } from "../api/userAPI";
import { UserContext } from "../context/UserContext";


const PortfolioComponent = () => {
    const navigator = useNavigate()
    const {token} = useContext(UserContext)
    const [projects, setProjects] = useState([])
    const [user, setUser] = useState({})
    const {id} = useParams()
    const langs = {
        "Java": <BiLogoJava className="h-10 w-10"/>, 
        "JavaScript": <BiLogoJavascript className="h-10 w-10"/>, 
        "Go": <BiLogoGoLang className="h-10 w-10"/>,
        "HTML": <BiLogoHtml5 className="h-10 w-10"/>
    }

    useEffect(() => {
        if (!token) {
            navigator('/')
        }
        init()
    }, [])

    const init = async() => {
        getPortfolioByUser(id)
            .then((Response) => {
                setProjects(Response.data.projects)
            }).catch(error => console.error(error))
        getUser(id)
        .then((Response) => {
            setUser(Response.data)
        }).catch(error => console.error(error))
    }

    return (
        <div className="container mx-auto">
            <h2 className="font-bold text-xl mb-6">{user.firstName}'s Portfolio</h2>
            <ul className="h-10">
                    {projects.map(project => 
                        <a key={project._id} href={project.link}>
                            <li className="bg-slate-300 rounded-md mb-8 flex relative transition ease-in-out duration-300 group cursor-pointer hover:bg-slate-200">
                                <img src={"https://cdn.icon-icons.com/icons2/3266/PNG/512/git_repository_icon_207309.png"} alt={project.companyName} className="w-28 h-full rounded-l-md mr-4"/>
                                <div className="h-auto leading-5 w-2/3 py-1 flex flex-col">
                                    <p className="font-bold mb-2">{project.name}</p>
                                    <p className="font-regular mb-2">{project.description}</p>
                                    <p className="mb-auto">{langs[project.additional_info]}</p>
                                </div>
                                <div className=" ml-auto">
                                    <MdKeyboardArrowRight  className="absolute right-6 opacity-100 group-hover:opacity-0 aspect-square w-20 h-full my-auto transition ease-in-out duration-300"/>
                                    <MdKeyboardDoubleArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 aspect-square w-20 h-full my-auto transition ease-in-out duration-300"/>
                                </div>
                            </li>
                        </a>
                    )}
                </ul>
        </div>
    )
}

export default PortfolioComponent