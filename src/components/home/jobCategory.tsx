import {Carousel, CarouselSlide} from "@mantine/carousel";
import { jobCategory } from "../../Data/Data";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";

const JobCategory = () => {
    return (
        <div className={'mt-20 pb-5'}>
            <div className={'text-4xl text-center font-semibold text-mine-shaft-100 mb-3'}>
                Browse <span className={'text-bright-sun-400'}>
                    Job
                </span> Category
            </div>
            <div className={'text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2'}>
                Explore diverse job opportunities tailored to your skills. Start your career journey today!
            </div>
            <Carousel slideSize="18%" slideGap="md" loop className={'focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:opacity-0 hover:[&_button]:opacity-100'}
                nextControlIcon={<IconArrowRight className={'h-8 w-8'} />}
                previousControlIcon={<IconArrowLeft className={'h-8 w-8'} />}
            >
                {jobCategory.map((jc, index) => (
                    <CarouselSlide key={index}>
                        <div className={'flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 my-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] transition duration-300 ease-in-out !shadow-bright-sun-300'}>
                            <div className={'p-2 bg-amber-300 rounded-full'}>
                                <img
                                    className={'h-8 w-8'}
                                    src={`/src/assets/Category/${jc.name}.png`}
                                    alt={jc.name} />
                            </div>
                            <div className={'text-xl font-semibold text-mine-shaft-100'}>
                                {jc.name}
                            </div>
                            <div className={'text-sm text-center text-mine-shaft-300'}>
                                {jc.desc}
                            </div>
                            <div className={'text-lg text-bright-sun-300'}>
                                {jc.jobs}+ new job posted
                            </div>
                        </div>
                    </CarouselSlide>
                ))}
            </Carousel>

        </div>
    )
}
export default JobCategory
