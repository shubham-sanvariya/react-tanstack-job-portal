import { createFileRoute } from '@tanstack/react-router'
import DreamJob from '../components/home/dreamJob'
import Companies from '../components/home/companies'
import JobCategory from '../components/home/jobCategory'
import Working from '../components/home/working'
import Testimonials from '../components/home/testimonials'
import Subscribe from '../components/home/subscribe'
import {getProfileById} from "../service/profileService.ts";



export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    const user =  context.user;
    await context.queryClient.prefetchQuery({
      queryKey: ["userProfile", user?.profileId],
      queryFn: () => getProfileById(Number(user?.profileId)),
      staleTime: Infinity
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
    <DreamJob />
    <Companies />
    <JobCategory />
    <Working />
    <Testimonials/>
    <Subscribe/>
</div>
}
