import React from "react";

const PostCard = ({
  post,
  showActions = false,
  showAuthor = true,
  onEdit,
  onDelete,
  className = "",
}) => {
  const getStatusBadge = (post) => {
    if (post.status === "published") {
      if (post.scheduledFor && post.scheduledFor > Date.now()) {
        return {
          variant: "secondary",
          className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          label: "Scheduled",
        };
      }
      return {
        variant: "default",
        className: "bg-green-500/20 text-green-300 border-green-500/30",
        label: "Published",
      };
    }

    return {
      variant: "outline",
      className: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      label: "Draft",
    };
  };
  
  return <div>PostCard</div>;
};

export default PostCard;
