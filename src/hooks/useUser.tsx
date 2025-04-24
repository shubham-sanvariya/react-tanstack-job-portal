import {useMutation, useQuery} from "@tanstack/react-query";
import {getUser, updateUserName} from "../service/userService.ts";
import queryClient from "../service/queryClient.ts";
import {UserType} from "../types/profileType.ts";
import {handleError} from "../service/errorService.ts";

const useUser = () => {

    const userState =  useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    const { data : user, isPending, error } = userState;

    interface UpdateUserProps {
        id: number;
        newUsername: string;
    }

    const { mutate : updateUserNameMutate } = useMutation({
        mutationFn: async ({id,newUsername} : UpdateUserProps) => updateUserName(id,newUsername),
        onMutate: async ({newUsername}) => {
            await queryClient.cancelQueries({
                queryKey: ["user"]
            })

            const previousUser = queryClient.getQueryData<UserType>(["user"]);

            queryClient.setQueryData(["user"], (old : UserType) => ({
                ...old,
                name: newUsername
            }))

            return { previousUser }
        },
        onError : (error, _, context) => {
            if (context?.previousUser){
                queryClient.setQueryData(["user"],context.previousUser);
            }
            handleError(error,"Failed to update User Name")
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            }).then()
        }
    })


    return { user, isPending, error, updateUserNameMutate };
}
export default useUser
