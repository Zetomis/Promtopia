"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useEffect, useState } from "react";

const EditPromptPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const promptId = useSearchParams().get("id");

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: post.tag,
            });
        };

        if (promptId) {
            getPromptDetails(promptId);
        }
    }, [promptId]);

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Missing PromptId!");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editPrompt}
            />
        </div>
    );
};

export default EditPromptPage;
