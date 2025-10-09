// pages/404.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Custom404 = () => {
  const router = useRouter();

  // Redirect to the home page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/'); 
    }, 3000); 
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router]);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
        // Subtle light blue gradient inspired by your homepage
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)', 
        color: '#2c3e50', // Darker blue for primary text (similar to your H1)
        fontFamily: 'system-ui, sans-serif', // Use your site's actual font if known
      }}
    >
      <h1 
        style={{
          fontSize: '10rem', // Large and impactful 404
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '20px',
          color: '#2F54EB', // Wren AI Accent Green
          // Optional: Add a subtle text shadow for depth, similar to button styles
          textShadow: '0 0 3px oklch(42.4% 0.199 265.638)',
        }}
      >
        404
      </h1>
      
      <h2 
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '15px',
          color: '#2c3e50', // Matching your main headings
        }}
      >
        Sorry.. the page not found 📡
      </h2>

      <p 
        style={{
          fontSize: '1.2rem',
          maxWidth: '500px',
          lineHeight: '1.6',
          marginBottom: '30px',
          color: '#5a6d80', // Slightly lighter dark blue for description, good contrast
        }}
      >
        It looks like the page you requested can't be found. 
        We'll reroute you to the homepage in a moment.
      </p>

      {/* Manual Link - Styled like your "Get Started" or "Start Free Trial" button */}
      <Link href="/" passHref legacyBehavior>
        <a style={{
          padding: '12px 28px',
          // Gradient background for the button, mimicking your CTA
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', 
          color: '#FFFFFF', // White text on blue gradient
          textDecoration: 'none',
          borderRadius: '8px', // Matching button rounded corners
          fontWeight: 700,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', // More pronounced shadow for CTA
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          border: 'none', // Ensure no default border
        }}>
          Click here to go back immediately →
        </a>
      </Link>
    </div>
  );
};

export default Custom404;