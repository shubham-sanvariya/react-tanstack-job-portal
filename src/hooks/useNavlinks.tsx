import useUser from "./useUser.tsx";

const useNavLinks = () => {
    const { userState } = useUser();
    const accountType = userState.data?.accountType;

    const links = accountType === "APPLICANT" ? [
        {name: "Find Jobs", url: "find-jobs"},
        {name: "Job History", url: "job-history"},
    ] : [
        {name: "Find Talent", url: "find-talent"},
        {name: "Post Jobs", url: "post-job"},
        {name: "Posted Job", url: "posted-jobs"},
    ]

    return  { links };
}
export default useNavLinks
