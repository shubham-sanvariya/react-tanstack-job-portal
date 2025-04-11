import { createFileRoute } from '@tanstack/react-router'
import DreamJob from '../components/home/dreamJob'
import Companies from '../components/home/companies'
import JobCategory from '../components/home/jobCategory'
import Working from '../components/home/working'



export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
    <DreamJob />
    <Companies />
    <JobCategory />
    <Working />
</div>
}
