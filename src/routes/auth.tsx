import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import fishingRod from '../../src/assets/Fishing-Rod.svg'
export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  return <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] overflow-hidden">
    <Button
      onClick={() => navigate({ to: '/' })}
      className="!absolute left-5 z-10"
      leftSection={<IconArrowLeft size={20} />}
      color={'bright-sun.4'}
      variant={"light"}
    >
      Home
    </Button>

    <div className={`flex [&>*]:flex-shrink-0 w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 ${location.pathname === '/auth/signup' ? '-translate-x-1/2' : 'translate-x-0'
      }`}>
      <Outlet />

      <div className={`flex flex-col justify-center items-center gap-5 w-1/2 h-full transition-all duration-1000 ease-in-out bg-mine-shaft-900 ${location.pathname === '/auth/signup' ? 'rounded-r-[200px]' : 'rounded-l-[200px]'
        }`}>
        <div className='flex gap-3 items-center text-bright-sun-400'>
          <img src={fishingRod} alt="SVG Icon" className="w-16 h-16" />
          <div className='text-6xl font-bold'>JobFetch</div>
        </div>
        <div className="text-2xl text-mine-shaft-200 font-semibold">
          Find the job made for you
        </div>
      </div>
    </div>
  </div>
}
