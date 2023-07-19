"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user?.id}/posts`
            );
            const data = await response.json();
            setPosts([...data]);
        };

        if (session?.user?.id) {
            fetchPosts();
        }
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
        console.log("alo");
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter(
                    (item) => item._id !== post._id
                );

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <Profile
                name="My"
                desc="Welcome ig"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default ProfilePage;
