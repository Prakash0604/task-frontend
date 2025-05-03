import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "../ui/input";

interface FileUploadProps {
        value: File | null;
        onChange: (file: File | null) => void;
        className?: string;
        error?: string;
}

export function FileUpload({ value, onChange, className, error }: FileUploadProps) {
        const onDrop = useCallback(
                (acceptedFiles: File[]) => {
                        if (acceptedFiles?.[0]) {
                                console.log("Selected File:", acceptedFiles[0]); // Debug: Should log File object
                                onChange(acceptedFiles[0]);
                        }
                },
                [onChange]
        );

        console.log("FileUpload value:", value); // Debug: Should log File object or null

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
                onDrop,
                accept: {
                        "image/jpeg": [".jpeg", ".jpg"],
                        "image/png": [".png"],
                        "image/webp": [".webp"],
                },
                maxFiles: 1,
                multiple: false,
        });

        const removeFile = () => {
                onChange(null);
        };

        return (
                <div className="space-y-2">
                        {value ? (
                                <div className="flex items-center gap-2 rounded-md border p-2 bg-background">
                                        <div className="flex-1 truncate">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                                                                <Image
                                                                        height={40}
                                                                        width={40}
                                                                        src={URL.createObjectURL(value)}
                                                                        alt="Preview"
                                                                        className="h-full w-full object-cover overflow-hidden rounded-md"
                                                                />
                                                        </div>
                                                        <div className="truncate">
                                                                <p className="text-xs text-muted-foreground">
                                                                        {(value.size / 1024 / 1024).toFixed(2)}MB
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>
                                        <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={removeFile}
                                                className="h-8 w-8 p-0 rounded-full"
                                        >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Remove file</span>
                                        </Button>
                                </div>
                        ) : (
                                <div
                                        {...getRootProps()}
                                        className={cn(
                                                "border-2 border-dashed rounded-md cursor-pointer transition-colors",
                                                "flex flex-col items-center justify-center p-6 text-center",
                                                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                                                className
                                        )}
                                >
                                        <Input {...getInputProps()} />
                                        <div className="flex flex-col items-center gap-2">
                                                <UploadCloud
                                                        className={cn("h-10 w-10", isDragActive ? "text-primary" : "text-muted-foreground")}
                                                />
                                                <div className="flex flex-col space-y-1">
                                                        <span className="text-sm font-medium">
                                                                {isDragActive ? "Drop the file here" : "Drop profile image here"}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">or click to browse</span>
                                                </div>
                                        </div>
                                </div>
                        )}
                        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                </div>
        );
}