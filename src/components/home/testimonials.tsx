import {Avatar, Rating} from "@mantine/core";
import {testimonials} from "../../Data/Data";

const Testimonials = () => {
    return (
        <div className={'mt-20 pb-5'}>
            <div className={'text-4xl text-center font-semibold text-mine-shaft-100 mb-3'}>
                What <span className={'text-bright-sun-400'}>
                user
            </span> say's about us ?
            </div>
            <div className={'flex justify-evenly'}>

            {
                testimonials.map((data, index) => (
                    <div key={index}
                         className={'flex flex-col gap-3 w-[23%] border rounded-xl mt-10 border-bright-sun-400 p-3'}>
                        <div className={'flex gap-2 items-center'}>
                            <Avatar className={'!h-14 !w-14'} src="/src/assets/avatar.png" alt={"it's me"}/>
                            <div>
                                <div className={'text-lg text-mine-shaft-100 font-semibold'}>{data.name}</div>
                                <Rating value={3.5} fractions={2} readOnly/>
                            </div>
                        </div>
                        <div className={'text-xs text-mine-shaft-300'}>
                            {data.testimonial}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default Testimonials
