import { Avatar, AvatarGroup, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        <div className={'flex items-center px-16'}>
            <div className={'flex flex-col w-[45%] gap-3'}>
                <div className={'text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400'}>Find your <span>dream job</span> with us</div>
                <div className={'text-lg text-mine-shaft-200'}>Good life begins with a good company. Start exploring thousands of jobs in one place.</div>
                <div className={'flex gap-3 mt-5'}>
                    <TextInput className={'bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100'} variant={'unstyled'} label={'Job Title'} placeholder={'Software Engineer'} />

                    <TextInput className={'bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100'} variant={'unstyled'} label={'Job Type'} placeholder={'Full time'} />

                    <div className={'flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer'}>
                        <IconSearch className="h-[85%] w-[85%]" />
                    </div>
                </div>
            </div>
            <div className={'flex items-center justify-center w-[55%]'}>
                <div className={'w-[30rem] relative'}>
                    <img src={'/src/assets/Boy.png'} alt={'boy'} />
                    <div className={'absolute -right-10 top-[50%] w-fit border-bright-sun-400 border rounded-lg p-3 backdrop-blur-md'}>
                        <div className="text-center mb-1 text-sm  text-mine-shaft-100">10K+ got jobs</div>
                        <AvatarGroup>
                            <Avatar src={'/src/assets/avatar.png'} />
                            <Avatar src={'/src/assets/avatar2.png'} />
                            <Avatar src={'/src/assets/avatar3.png'} />
                            <Avatar>+5</Avatar>
                        </AvatarGroup>
                    </div>
                    <div className={'absolute -left-10 top-[25%] w-fit border-bright-sun-400 border rounded-lg p-3 backdrop-blur-md flex flex-col gap-3'}>
                        <div className={'flex items-center gap-2'}>
                            <div className={'w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg'}>
                                <img src={'/src/assets/icons/Google.png'} alt={'google'} />
                            </div>
                            <div className={'text-sm text-mine-shaft-100'}>
                                <div>software Engineer</div>
                                <div className={'text-mine-shaft-200 text-xs'}>New york</div>
                            </div>
                        </div>
                        <div className={'flex gap-2 justify-around text-mine-shaft-200 text-xs'}>
                            <span>1 day ago</span>
                            <span> 120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DreamJob
