'use client';

// import ContentToolbar from '@/components/ContentToolbar'; // Temporarily disabled for build

export default function LocalizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* <ContentToolbar /> */}
    </>
  );
}