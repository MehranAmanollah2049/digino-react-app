import toast from "react-hot-toast";
import useUser from "../stores/auth/useUser";
import { useState } from "react";
import Nprogress from 'nprogress'
import HttpRequest from "../api/ApiConfig";


export default function useLike(id: number, LikeListInitial: number[], callback?: (obj: { id: number, likes: number[] }) => void) {

    const { isLoggedIn, user } = useUser();
    const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false)
    const [LikeList, setLikeList] = useState<number[]>(LikeListInitial)

    const HasLiked = isLoggedIn() && LikeList.includes(user!.id)

    const handleLike = (): void | undefined => {

        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید")
            return;
        }

        if (!isLikeLoading) {
            setIsLikeLoading(true)
            Nprogress.start();

            HttpRequest.post(`/like/${id}`)
                .then(res => {
                    setIsLikeLoading(false)
                    Nprogress.done();

                    if (res) {
                        setLikeList(prev => {
                            const updated = prev.includes(user!.id)
                                ? prev.filter(id => id !== user!.id)
                                : [...prev, user!.id];

                            if (callback) {
                                callback({ id, likes: updated });
                            }

                            return updated;
                        });

                    }
                })
                .catch(() => {
                    setIsLikeLoading(false)
                    Nprogress.done();
                })
        }
    }


    return {
        isLikeLoading,
        handleLike,
        HasLiked,
        LikeList
    }
}