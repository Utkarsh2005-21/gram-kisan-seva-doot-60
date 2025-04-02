
import React from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PhotoUploadProps {
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  imagePreview,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <div className="form-control">
      <Label className="form-label">Add Photo Evidence (Optional)</Label>
      <div className="mt-1">
        {imagePreview ? (
          <div className="relative rounded-md overflow-hidden h-48 bg-gray-100">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onRemoveImage}
            >
              Remove
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload an image</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={onImageUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
