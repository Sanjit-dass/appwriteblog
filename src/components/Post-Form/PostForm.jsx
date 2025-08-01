import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            contents: post?.contents || "", 
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (post) {
                // If editing, delete old image if new uploaded
                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const updatedPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                    userId: userData?.$id,
                    username: userData?.name,
                });

                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
            } else {
                // Creating new post
                const newPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file ? file.$id : null,
                    userId: userData?.$id,
                    username: userData?.name,
                });

                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        } catch (error) {
            console.error("Post submission error:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6 px-4 dark:text-white">
            {/* Left Column */}
            <div className="w-full md:w-2/3 space-y-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Contents :"
                    name="contents"
                    control={control}
                    defaultValue={getValues("contents")}
                    className="dark:bg-gray-800 dark:text-white"
                />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/3 space-y-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    {...register("image", { required: !post })}
                />

                {post?.featuredImage && (
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg max-h-64 w-full object-cover border dark:border-gray-600"
                    />
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500 dark:bg-green-600" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
