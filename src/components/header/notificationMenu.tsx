import {Indicator, Menu, Notification, rem} from "@mantine/core";
import { useState } from "react";
import {IconBell, IconCheck} from "@tabler/icons-react";
import {NotificationType} from "../../types/notificationTypes.ts";
import {useNavigate} from "@tanstack/react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import useUser from "../../hooks/useUser.tsx";
import {getAllNotificationByUserId, readNotificationById} from "../../service/notificationService.ts";
import queryClient from "../../service/queryClient.ts";
import {handleError} from "../../service/errorService.ts";

const NotificationMenu = () => {
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const { user } = useUser();

    const { data: notifications } = useQuery<NotificationType[]>({
        queryKey: ["notifications", user?.id],
        queryFn: () => getAllNotificationByUserId(Number(user?.id))
    });

    const { mutate : unReadMutate  } = useMutation({
        mutationFn: readNotificationById,
        onMutate: async (notificationId : number) => {

            await queryClient.cancelQueries({ queryKey: ['notifications', user?.id] });

            const previousNotifications = queryClient.getQueryData<NotificationType[]>(['notifications', user?.id]);

            queryClient.setQueryData(["notifications", user?.id], (old : NotificationType[] = []) => {
                return old.filter(n => Number(n.id) !== notificationId);
            })

            return { previousNotifications }
        },
        onError: (error, _, context) => {
            if (context?.previousNotifications){
                queryClient.setQueryData(['notifications', user?.id], context.previousNotifications);
            }
            handleError(error,"Failed to close notification");
        },
        onSettled: () => {
            // Refetch to ensure server-state consistency
            queryClient.invalidateQueries({queryKey: ["notifications", user?.id]}).then();
        }
    })

    return (
        <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
            <Menu.Target>
                <div className={'bg-mine-shaft-900 p-1.5 rounded-full'}>
                    <Indicator disabled={notifications?.length===0} color={'bright-sun.4'} offset={6} size={7} processing>
                        <IconBell stroke={'1.5'}/>
                    </Indicator>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <div className={'flex flex-col gap-1'}>
                    {
                        notifications?.map((item: NotificationType, index: number) => (
                            <Notification onClick={() => {
                                navigate({ to: item.route }).then();
                                setOpened(false);
                                unReadMutate(Number(item.id));
                            }} tabIndex={index} onClose={() => unReadMutate(Number(item.id))}
                                          className={'cursor-pointer hover:bg-mine-shaft-900'}
                                          icon={<IconCheck style={{width: rem(20), height: rem(20)}}/>} color="teal"
                                          title={item.action} mt="md">
                                {item.message}
                            </Notification>
                        ))
                    }
                    {
                        notifications?.length === 0 && (
                            <div className="text-center text-mine-shaft-300">
                                No Notifications
                            </div>
                        )
                    }
                </div>


                <Menu.Divider/>


            </Menu.Dropdown>
        </Menu>
    )
}
export default NotificationMenu
