"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Filter, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { BarLoader } from "react-spinners";

const PostPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();

  const { data: posts, isLoading } = useConvexQuery(api.posts.getUserPosts);
  const deletePost = useConvexMutation(api.posts.deletePost);

  const filterPosts = useMemo(() => {
    if (!posts) return [];

    let filtered = posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "mostViews":
          return b.viewCount - a.viewCount;
        case "mostLikes":
          return b.likeCount - a.likeCount;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return filtered;
  }, [posts, searchQuery, statusFilter, sortBy]);

  console.log(filterPosts);

  if (isLoading) {
    return <BarLoader width={"100%"} color="#D8B4FE" />;
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="">
          <h1 className="text-3xl font-bold gradient-text-primary">My Post</h1>
          <p className="text-slate-400 mt-2">
            Manage and track your content performance
          </p>
        </div>

        <Link href="/dashboard/create">
          <Button variant="primary">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 "
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40 bg-slate-800 border-slate-600">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-40 bg-slate-800 border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="mostViews">Most Views</SelectItem>
            <SelectItem value="mostLikes">Most Likes</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PostPage;
