"use client";
import React, { useEffect, useState } from "react";
import PublicHeader from "../_components/public-header";
import { useUser } from "@clerk/nextjs";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Image from "next/image";

const PostPage = ({ params }) => {
  const { username, postId } = React.use(params);
  const { user: currentUser } = useUser();

  const [commentContent, setCommentContent] = useState("");

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useConvexQuery(api.public.getPublishedPost, { username, postId });

  const { data: comments, isLoading: commentsLoading } = useConvexQuery(
    api.comments.getPostComments,
    { postId }
  );

  // Get like status for current user
  const { data: hasLiked } = useConvexQuery(
    api.likes.hasUserLiked,
    currentUser ? { postId } : "skip"
  );

  const toggleLike = useConvexMutation(api.likes.toggleLike);

  const { mutate: addComment, isLoading: isSubmittingComment } =
    useConvexMutation(api.comments.addComment);

  const deleteComment = useConvexMutation(api.comments.deleteComment);

  const incrementView = useConvexMutation(api.public.incrementViewCount);

  // Track view when post loads
  useEffect(() => {
    if (post && !postLoading) {
      incrementView.mutate({ postId });
    }
  }, [postLoading]);

  if (postLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (postError || !post) {
    notFound();
  }

  return (
    <div className="mihn-screen bg-slate-900 text-white">
      <PublicHeader link={`/${username}`} title="Back to Profile" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="space-y-6">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-96 rounded-xl overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default PostPage;
