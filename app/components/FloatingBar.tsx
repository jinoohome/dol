"use client";

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function FloatingBar({ mapUrl }: { mapUrl?: string }) {
  async function share() {
    const data = { title: document.title, text: "첫돌 초대장", url: location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(location.href);
        alert("링크가 복사되었습니다");
      }
    } catch {}
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="container">
        <div className="m-3 rounded-2xl card shadow-soft bg-white p-2 flex gap-2">
          <button className="btn btn-outline flex-1 flex items-center justify-center gap-2" onClick={share} aria-label="공유하기">
            <ShareIcon />
            공유
          </button>
          {mapUrl ? (
            <a className="btn btn-outline flex-1 flex items-center justify-center gap-2" href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="지도 열기">
              <MapIcon />
              지도
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
} 