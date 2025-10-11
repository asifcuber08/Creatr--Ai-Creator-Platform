"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const transformationSchema = z.object({
  aspectRatio: z.string().default("original"),
  customWidth: z.number().min(100).max(2000).default(800),
  customHeight: z.number().min(100).max(2000).default(600),
  smartCropFocus: z.string().default("auto"),
  textOverlay: z.string().optional(),
  textFontSize: z.number().min(12).max(200).default(50),
  textColor: z.string().default("#ffffff"),
  textPosition: z.string().default("center"),
  backgroundRemoved: z.boolean().default(false),
  dropShadow: z.boolean().default(false),
});

const ASPECT_RATIOS = [
  { label: "Original", value: "original" },
  { label: "Square (1:1)", value: "1:1", width: 400, height: 400 },
  { label: "Landscape (16:9)", value: "16:9", width: 800, height: 450 },
  { label: "Portrait (4:5)", value: "4:5", width: 400, height: 500 },
  { label: "Story (9:16)", value: "9:16", width: 450, height: 800 },
  { label: "Custom", value: "custom" },
];

const SMART_CROP_OPTIONS = [
  { label: "Auto", value: "auto" },
  { label: "Face", value: "face" },
  { label: "Center", value: "center" },
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
];

const TEXT_POSITIONS = [
  { label: "Center", value: "center" },
  { label: "Top Left", value: "north_west" },
  { label: "Top Right", value: "north_east" },
  { label: "Bottom Left", value: "south_west" },
  { label: "Bottom Right", value: "south_east" },
  { label: "top", value: "north" },
  { label: "bottom", value: "south" },
  { label: "left", value: "west" },
  { label: "right", value: "east" },
];

const ImageUploadModal = ({
  isOpen,
  onClose,
  onImageSelect,
  title = "Upload & Transform Image",
}) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadImage, setUploadImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [transformedImage, setTransformedImage] = useState(null);
  const [isTransforming, setIsTransforming] = useState(false);

  const { watch, setValue, reset } = useForm({
    resolver: zodResolver(transformationSchema),
    defaultValues: {
      aspectRatio: "original",
      customWidth: 800,
      customHeight: 600,
      smartCropFocus: "auto",
      textOverlay: "",
      textFontSize: 50,
      textColor: "#ffffff",
      textPosition: "center",
      backgroundRemoved: false,
      dropShadow: false,
    },
  });

  const watchedValues = watch();

  const handleClose = () => {
    onClose();
    // resetForm();
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    console.log(file);

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);

    try {
      
    } catch (error) {
      
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    multiple: false,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-6xl !h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription>
            Upload an image and apply AI-powered transformations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="transform" disabled={!uploadImage}>
              Transform
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors`}
            >
              <input {...getInputProps()} />

              {isUploading ? (
                <div className="space-y-3">
                  <Loader2 className="h-12 w-12 mx-auto animate-spin text-purple-400" />
                  <p className="text-slate-300">Uploading image...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-slate-400" />
                  <div className="">
                    <p className="text-lg text-white">
                      {isDragActive
                        ? "Drop the image here"
                        : "Drag & drop an image here"}
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                      or click to select a file (JPG, PNG, WebP, GIF - Max
                      100MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="transform" className="space-y-6">
            transform
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
