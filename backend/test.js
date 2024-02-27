import { getGitProfile } from "./util/githubService.js";

const data1 = {
    name: "Danil"
}

const data2 = {
    surname: "Li"
}
const data3 = Object.assign(data1, data2)
console.log(data3)