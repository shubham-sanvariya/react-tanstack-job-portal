import { createFileRoute } from '@tanstack/react-router'
import {Divider} from "@mantine/core";
import Profile from "../components/profile/profile.tsx";

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] overflow-hidden">
    <Divider mx={'md'} mb={'xl'}/>
    <Profile/>
  </div>
}
