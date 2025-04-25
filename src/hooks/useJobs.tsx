import {useQuery} from "@tanstack/react-query";
import {getJobs} from "../service/jobService.ts";
import {JobType} from "../types/jobTypes.ts";


interface GetJobsProps {
    jobStatus?: string;
    page?: number;
    size?: number;
    sort?: string;
}

const useJobs = ({
                     jobStatus = "ACTIVE",
                     page = 1,
                     size = 10,
                     sort = ""
                 }: GetJobsProps = {}) => {

    return useQuery<JobType[]>({
        queryKey: ["jobs", jobStatus, page, size, sort],
        queryFn: async () => {
            const res = await getJobs(jobStatus, page, size, sort);
            return res.content; // Directly return content
        },
        staleTime: 5 * 60 * 1000,
    });
};

export default useJobs;
