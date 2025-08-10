"use client";

export default function MapButtons({ kakao, naver, tel, address }: { kakao?: string; naver?: string; tel?: string; address?: string }) {
  return (
    <div className="flex gap-2">
      {kakao ? (
        <a className="btn btn-outline" href={kakao} target="_blank" rel="noopener noreferrer" aria-label="카카오맵 열기">
          카카오맵
        </a>
      ) : null}
      {naver ? (
        <a className="btn btn-outline" href={naver} target="_blank" rel="noopener noreferrer" aria-label="네이버지도 열기">
          네이버지도
        </a>
      ) : null}
      {tel ? (
        <a className="btn btn-outline" href={`tel:${tel}`} aria-label="장소 전화하기">
          전화
        </a>
      ) : null}
      {address ? (
        <a className="btn btn-outline" href={`maps:?q=${encodeURIComponent(address)}`} aria-label="지도 앱에서 길찾기">
          길찾기
        </a>
      ) : null}
    </div>
  );
} 