import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
export default function FirstPost() {
  return (
    <>
     <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
       <Image
    src="/images/face.jpg" // Route of the image file
    height={250} // Desired size with correct aspect ratio
    width={200} // Desired size with correct aspect ratio
    alt="Your Name"
  />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
