"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2, Save, Send, Settings } from "lucide-react";
import { Badge } from "./ui/badge";

const PostEditorHeader = (
  mode,
  initialData,
  isPublishing,
  onSave,
  onPublish,
  onSchedule,
  onSettingOpen,
  onBack
) => {
  const [isPublishMenuOpen, setIsPublishMenuOpen] = useState(false);

  const isDraft = initialData?.status === "draft";
  const isEdit = mode === "edit";

  return (
    <header className="sticky top-0 bg-slate-900/80 backdrop:blur-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {isDraft && (
            <Badge
              variant="secondary"
              className="bg-orange-500/20 text-orange-300 border-orange-500/30"
            >
              Draft
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
          variant="ghost"
          size="sm"
          onClick={onSettingOpen}
          className="text-slate-400 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {!isEdit && (
            <Button
            onClick={onSave}
            disabled={isPublishing}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
          )}

          {isEdit ? ( <Button
          variant={"primary"}
          disabled={isPublishing}
          onClick={()=>{
            onPublish()
            setIsPublishMenuOpen(false)
          }}
          >
            {isPublishing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Update
          </Button>):(
            
          )}
        </div>
      </div>
    </header>
  );
};

export default PostEditorHeader;
