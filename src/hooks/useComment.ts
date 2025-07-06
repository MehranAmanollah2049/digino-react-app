import React from "react";
import Nprogress from 'nprogress'
import useUser from "../stores/auth/useUser";
import type { FormConfigType } from "../components/single-product/comments/CommentSection";
import toast from "react-hot-toast";
import HttpRequest from "../api/ApiConfig";


export default function useComment() {

    const { isLoggedIn } = useUser()

    const add_comment = (
        id: number,
        FormConfig: FormConfigType,
        setFormConfig: React.Dispatch<React.SetStateAction<FormConfigType>>,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        score: string,
        setScore: React.Dispatch<React.SetStateAction<string>>,
        isValidText: () => boolean, 
        setTextError: () => void
    ) => {

        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید");
            return;
        }

        if(!isValidText()) {
            setTextError();
        }

        if (score.trim() === '') {
            toast.error("لطفا اطلاعات خواسته شده را وارد کنید");
        }

        if(score.trim() == '' || !isValidText()) return

        if (!FormConfig.loading) {
            setFormConfig(prev => ({ ...prev, loading: true }));
            Nprogress.start();

            HttpRequest.post(`/add-comment/${id}`, { text, score })
                .then(res => {
                    setFormConfig(prev => ({ ...prev, loading: false }));
                    Nprogress.done();
                    if (res) {
                        toast.success("دیدگاه شما بعد از تایید شدن نمایش داده می شود");
                        setFormConfig(prev => ({ ...prev, active: false }));
                        setText('');
                        setScore('');
                    }
                })
                .catch(() => {
                    setFormConfig(prev => ({ ...prev, loading: false }));
                    Nprogress.done();
                });
        }
    };

    const add_answer = (
        FormConfig: FormConfigType,
        setFormConfig: React.Dispatch<React.SetStateAction<FormConfigType>>,
        comment_id: number,
        answerable_id: number,
        answerable_type: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        isValidText: () => boolean, 
        setTextError: () => void
    ) => {
        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید");
            return;
        }

        if(!isValidText()) {
            setTextError();
            return;
        }
        
        if (!FormConfig.loading) {
            setFormConfig(prev => ({ ...prev, loading: true }));
            Nprogress.start();

            HttpRequest.post(`/add-answer/${comment_id}`, {
                answerable_id: `${answerable_id}`,
                answerable_type,
                text
            })
                .then(res => {
                    setFormConfig(prev => ({ ...prev, loading: false }));
                    Nprogress.done();
                    if (res) {
                        toast.success("دیدگاه شما بعد از تایید شدن نمایش داده می شود");
                        setFormConfig(prev => ({ ...prev, active: false }));
                        setText('');
                    }
                })
                .catch(() => {
                    setFormConfig(prev => ({ ...prev, loading: false }));
                    Nprogress.done();
                });
        }
    };

    return {
        add_comment,
        add_answer
    }
}