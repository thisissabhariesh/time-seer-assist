import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  title: string;
  description: string;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ title, description, onFileSelect, selectedFile }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="mb-4">
            {selectedFile ? (
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
            ) : (
              <Upload className="w-12 h-12 text-primary mx-auto" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {selectedFile ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                <File className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">{selectedFile.name}</span>
              </div>
              <Button
                onClick={handleClick}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Choose Different File
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleClick}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select CSV File
            </Button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};