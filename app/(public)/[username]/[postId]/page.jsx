"use client";
import React, { useEffect, useState } from "react";
import PublicHeader from "../_components/public-header";
import { useUser } from "@clerk/nextjs";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

  const handleLikeToggle = async () => {
    if (!currentUser) {
      toast.error("Please sign in to like posts.");
      return;
    }

    try {
      await toggleLike.mutate({ postId });
    } catch (error) {
      toast.error("Failed to update like")
    }
  };

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

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text-primary">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <Link href={`/${username}`}>
                <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="relative w-12 h-12">
                    {post.author.imageUrl ? (
                      <Image
                        src={post.author.imageUrl}
                        alt={post.author.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <p className="font-semibold text-white">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      @{post.author.username}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="text-right text-sm text-slate-400">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.viewCount.toLocaleString()} views
                </div>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none prose-invert prose-purple"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex items-center gap-6 pt-4 border-t border-slate-800">
            <Button
              onClick={handleLikeToggle}
              variant="ghost"
              className={`flex items-center gap-2 ${
                hasLiked
                  ? "text-red-400 hover:text-red-300"
                  : "text-slate-400 hover:text-white"
              }`}
              disabled={toggleLike.isLoading}
            >
              <Heart className={`h-5 w-5 ${hasLiked ? "fill-current" : ""}`} />
              {post.likeCount.toLocaleString()}
            </Button>

            <div className="flex items-center gap-2 text-slate-400">
              <MessageCircle className="h-5 w-5" />
              {comments?.length || 0} comments
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Comments</h2>
        </div>
      </div>

      {/* Custom prose styles */}
      <style jsx global>{`
        .prose-invert h1 {
          color: white;
          font-weight: 700;
          font-size: 2.5rem;
          margin: 1.5rem 0;
        }
        .prose-invert h2 {
          color: white;
          font-weight: 600;
          font-size: 2rem;
          margin: 1.25rem 0;
        }
        .prose-invert h3 {
          color: white;
          font-weight: 600;
          font-size: 1.5rem;
          margin: 1rem 0;
        }
        .prose-invert p {
          color: rgb(203, 213, 225);
          line-height: 1.7;
          margin: 1rem 0;
        }
        .prose-invert blockquote {
          border-left: 4px solid rgb(147, 51, 234);
          color: rgb(203, 213, 225);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        .prose-invert a {
          color: rgb(147, 51, 234);
        }
        .prose-invert a:hover {
          color: rgb(168, 85, 247);
        }
        .prose-invert code {
          background: rgb(51, 65, 85);
          color: rgb(248, 113, 113);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }
        .prose-invert pre {
          background: rgb(30, 41, 59);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(71, 85, 105);
          overflow-x: auto;
        }
        .prose-invert ul,
        .prose-invert ol {
          color: rgb(203, 213, 225);
          padding-left: 1.5rem;
        }
        .prose-invert li {
          margin: 0.25rem 0;
        }
        .prose-invert img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        .prose-invert strong {
          color: white;
        }
        .prose-invert em {
          color: rgb(203, 213, 225);
        }
      `}</style>
    </div>
  );
};

export default PostPage;
