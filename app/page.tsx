import StaggeredGrid from '@/components/StaggeredGrid';

export default function Home() {
  // data-landing switches the page to the warmer black (see globals.css)
  return (
    <div data-landing>
      <StaggeredGrid />
    </div>
  );
}
