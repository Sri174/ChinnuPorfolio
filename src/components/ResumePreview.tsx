import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface ResumePreviewProps {
  page1: string;
  page2: string;
  resumeUrl: string;
  className?: string;
}

export default function ResumePreview({ page1, page2, resumeUrl, className = '' }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDownload = async () => {
    try {
      // Show loading state
      const downloadBtn = document.getElementById('download-resume-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = 'Preparing PDF...';
        downloadBtn.setAttribute('disabled', 'true');
      }

      // Create a new PDF document
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Function to add an image to the PDF
      const addImageToPdf = (imgUrl: string): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = imgUrl;
          
          img.onload = () => {
            const imgWidth = doc.internal.pageSize.getWidth() - 20; // 10px margin on each side
            const imgHeight = (img.height * imgWidth) / img.width;
            
            // Add image to PDF
            doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight);
            resolve();
          };
          
          img.onerror = () => {
            console.error('Error loading image:', imgUrl);
            resolve();
          };
        });
      };

      // Add first page
      await addImageToPdf(page1);
      
      // Add second page
      doc.addPage();
      await addImageToPdf(page2);
      
      // Save the PDF
      doc.save('Veerachinnu_Resume.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF. Downloading single page instead.');
      // Fallback to direct download if PDF generation fails
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Veerachinnu_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      // Reset button state
      const downloadBtn = document.getElementById('download-resume-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<Download className="w-4 h-4 mr-2" /> Download PDF';
        downloadBtn.removeAttribute('disabled');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={`border-[#38F9D7]/40 text-white hover:bg-[#38F9D7]/10 px-8 py-3 rounded-full ${className}`}
        >  
          <Download className="w-4 h-4 mr-2" />
          View & Download Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold">My Resume</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(1)}
                className={`${currentPage === 1 ? 'bg-[#38F9D7] text-black' : 'text-white'}`}
              >
                Page 1
              </Button>
              <Button
                variant={currentPage === 2 ? "default" : "outline"}
                onClick={() => setCurrentPage(2)}
                className={`${currentPage === 2 ? 'bg-[#38F9D7] text-black' : 'text-white'}`}
              >
                Page 2
              </Button>
            </div>
          </div>
          
          <div className="relative w-full h-[70vh] overflow-auto bg-white rounded-lg">
            <img 
              src={currentPage === 1 ? page1 : page2} 
              alt={`Resume Page ${currentPage}`}
              className="w-full h-auto object-contain"
            />
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              id="download-resume-btn"
              onClick={handleDownload}
              className="bg-gradient-to-r from-[#14FFEC] to-[#43E97B] hover:from-[#10e8d7] hover:to-[#35d66a] text-black px-6 py-2 rounded-full flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
