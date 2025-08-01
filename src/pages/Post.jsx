import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Container>
        {/* Image Section */}
        <div className="relative mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[500px] object-contain rounded-xl mx-auto"
            onError={(e) => {
              e.target.src = "/fallback-image.png";
              e.target.alt = "Image not available";
            }}
          />
          {isAuthor && (
            <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-6 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            {post.title}
          </h1>
        </div>

        {/* Contents */}
        <div className="prose prose-lg sm:prose-xl max-w-4xl mx-auto text-gray-800 dark:text-gray-300 dark:prose-invert px-4 my-10">
          {parse(post.contents)}
        </div>
      </Container>
    </div>
  ) : null;
}
