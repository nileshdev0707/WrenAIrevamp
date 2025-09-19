import { useState } from "react";

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(tweetUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-15">
      <div className="flex items-center gap-5">
        <img
          src="/svg/avtar.svg"
          alt="Allison Hsieh"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900 text-lg">Allison Hsieh</p>
          <p className="text-sm text-gray-500">
            Updated: August 20, 2025 <br />
            Published: August 20, 2025
          </p>
        </div>
      </div>

      {/* Share + Stay updated */}
      <div className="grid grid-cols-2 items-center text-sm text-gray-700">
        <div className="flex flex-col gap-5">
          <span className="font-medium text-black text-base">Share this post</span>
          <div className="flex gap-6 text-gray-500">
            <div onClick={shareOnTwitter} className="cursor-pointer">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 0H0L8.26086 11.0145L0.44995 19.9999H3.09998L9.4883 12.651L15 20H22L13.3917 8.5223L20.8001 0H18.1501L12.1643 6.88578L7 0ZM16 18L4 2H6L18 18H16Z"
                  fill="#B3B3B3"
                />
              </svg>
            </div>

            <div onClick={shareOnLinkedIn} className="cursor-pointer">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.94146 1.99993C4.94109 2.81424 4.44706 3.54702 3.69232 3.85273C2.93758 4.15845 2.07285 3.97605 1.50588 3.39155C0.938906 2.80704 0.782926 1.93715 1.11148 1.19207C1.44004 0.44699 2.18752 -0.0245006 3.00146 -7.061e-05C4.08253 0.0323794 4.94195 0.918369 4.94146 1.99993ZM5.00146 5.47993H1.00146V17.9999H5.00146V5.47993ZM11.3215 5.47993H7.34146V17.9999H11.2815V11.4299C11.2815 7.7699 16.0515 7.4299 16.0515 11.4299V17.9999H20.0015V10.0699C20.0015 3.89993 12.9415 4.12993 11.2815 7.1599L11.3215 5.47993Z"
                  fill="#B3B3B3"
                />
              </svg>
            </div>

            <div onClick={shareOnFacebook} className="cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.002 0C4.4791 0 0.00195312 4.47715 0.00195312 10C0.00195312 14.9913 3.6588 19.1283 8.43947 19.8785V12.8906H5.90038V10H8.43947V7.79688C8.43947 5.29063 9.93237 3.90625 12.2166 3.90625C13.3107 3.90625 14.4551 4.10156 14.4551 4.10156V6.5625H13.1941C11.9519 6.5625 11.5645 7.33334 11.5645 8.1242V10H14.3379L13.8946 12.8906H11.5645V19.8785C16.3451 19.1283 20.002 14.9913 20.002 10C20.002 4.47715 15.5248 0 10.002 0Z"
                  fill="#B3B3B3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <span className="font-medium text-black text-base">Stay updated</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0C9.9411 0 18 8.0589 18 18H15C15 9.7157 8.2843 3 0 3V0ZM0 7C6.07513 7 11 11.9249 11 18H8C8 13.5817 4.41828 10 0 10V7ZM0 14C2.20914 14 4 15.7909 4 18H0V14Z"
              fill="#B3B3B3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
