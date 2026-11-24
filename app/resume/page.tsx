import BlurInStagger from '@/components/BlurInStagger';
import CvActions from '@/components/CvActions';
import ResumeViewer from '@/components/ResumeViewer';

// The two links printed on the PDF (their position on the page, as a share of its width and height), so they stay clickable on top of the image
const PDF_LINKS = [
  { href: 'https://tanyasingh.work', label: 'tanyasingh.work', left: 64.52, top: 7.77, width: 12.13, height: 1.59 },
  { href: 'https://www.linkedin.com/in/tanya-singh-ux/', label: 'LinkedIn profile', left: 79.56, top: 7.77, width: 13.97, height: 1.59 },
];

export default function ResumePage() {
  return (
    // Centred in the right panel, and wider than the case studies (up to 1120px) so the page fits without sideways scrolling even at 125% zoom. The top band beside the wordmark stays empty:
    // the content starts level with the first line of the bio (88px down), like the grid on the home page.
    <div className="px-4 lg:px-8 lg:w-full lg:max-w-[1120px] lg:mx-auto pb-32 lg:pb-20 pt-6 lg:pt-[88px]">
      {/* Each part softly blurs in, one after the other, like the thumbnails on the landing page */}
      <BlurInStagger>
        <CvActions />

        {/* The resume exactly as it is in the PDF, with a page count and zoom controls */}
        <ResumeViewer src="/images/resume.webp" alt="Resume (see the Open PDF link above for the file)" pages={1} links={PDF_LINKS} />
      </BlurInStagger>
    </div>
  );
}
