import { getInvite } from "@/app/lib/invite";
import SectionTitle from "@/app/components/SectionTitle";
import Hero from "@/app/components/Hero";
import Video from "@/app/components/Video";
import Guestbook from "@/app/components/Guestbook";
import FloatingBar from "@/app/components/FloatingBar";
import CopyLink from "@/app/components/CopyLink";
import LoadingScreen from "@/app/components/LoadingScreen";
import { formatKoreanDate } from "@/app/lib/format";
import Image from "next/image";

export default async function Page() {
  const invite = await getInvite();
  const partyDate = invite.event.date;
  const birthday = invite.baby.birthDate;

  return (
    <>
      <LoadingScreen />
      <div className="font-sans min-h-screen">
        <Hero name={invite.baby.name} cover={invite.media.cover} eventDate={partyDate} showDday={invite.options?.showDday} />

      <section className="section container">
        <SectionTitle>초대 인사말</SectionTitle>
        <div className="card p-8 shadow-soft text-center animate-fadeInUp animate-delay-200 hover-lift">
          {/* 초대 인사말 이미지 추가 */}
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] overflow-hidden rounded-2xl animate-scaleIn animate-delay-300">
              <Image 
                src="/images/woojin-04.jpg" 
                alt="우진이 초대 인사" 
                fill 
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px" 
                style={{ objectFit: "contain" }} 
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          
          <div className="text-lg leading-relaxed text-muted space-y-4">
            <p className="text-reveal animate-delay-500">
              소중한 우리 <span className="font-semibold gradient-text animate-pulse">우진</span>이<br />
              첫돌을 맞이했습니다.
            </p>
            <p className="text-reveal animate-delay-700">
              함께해 주시면 더없이<br />
              기쁜 날이 될 것입니다.
            </p>
            <p className="text-reveal animate-delay-1000 sparkles">
              따뜻한 마음으로<br />
              축복해 주세요. ♡
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle>아기 소개</SectionTitle>
        <div className="card p-6 shadow-soft animate-fadeInLeft animate-delay-300 hover-lift">
          {/* 아기 사진 추가 */}
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] overflow-hidden rounded-2xl animate-rotateIn animate-delay-500">
              <Image 
                src="/images/woojin-03.jpg" 
                alt={`우진 소개`} 
                fill 
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px" 
                style={{ objectFit: "contain" }} 
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInRight animate-delay-700">
              <span className="text-muted font-medium">이름</span>
              <span className="font-semibold gradient-text text-right sm:text-left sm:max-w-[60%]">최우진</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInRight animate-delay-700">
              <span className="text-muted font-medium">생일</span>
              <span className="font-medium text-right sm:text-left sm:max-w-[60%]">{formatKoreanDate(birthday)}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInRight animate-delay-1000">
              <span className="text-muted font-medium">돌잔치</span>
              <span className="font-medium text-right sm:text-left sm:max-w-[60%] animate-bounce">{formatKoreanDate(partyDate)} {invite.event.time}</span>
            </div>
          </div>
          {invite.baby.story ? (
            <div className="mt-6 pt-6 border-t border-brand/20 animate-slideInUp animate-delay-1000">
              <p className="text-center text-muted italic leading-relaxed">&ldquo;{invite.baby.story}&rdquo;</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section container">
        <SectionTitle>행사 정보</SectionTitle>
        <div className="card p-6 shadow-soft animate-fadeInRight animate-delay-200 hover-glow">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInUp animate-delay-300">
              <span className="text-muted font-medium">일시</span>
              <span className="font-medium text-right sm:text-left sm:max-w-[60%]">{formatKoreanDate(partyDate)} {invite.event.time}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInUp animate-delay-500">
              <span className="text-muted font-medium">장소</span>
              <span className="font-semibold text-right sm:text-left sm:max-w-[60%]">{invite.event.venue.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInUp animate-delay-700">
              <span className="text-muted font-medium">주소</span>
              <span className="text-sm text-right sm:text-left sm:max-w-[60%] break-words">{invite.event.venue.address}</span>
            </div>
            {invite.event.venue.parking ? (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInUp animate-delay-700">
                <span className="text-muted font-medium">주차</span>
                <span className="text-sm text-right sm:text-left sm:max-w-[60%] break-words">{invite.event.venue.parking}</span>
              </div>
            ) : null}
            {invite.event.venue.notes ? (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 sm:flex-wrap animate-fadeInUp animate-delay-1000">
                <span className="text-muted font-medium">위치</span>
                <span className="text-sm text-right sm:text-left sm:max-w-[60%] break-words">{invite.event.venue.notes}</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* {invite.media.gallery?.length ? (
        <section className="section container">
          <SectionTitle>소중한 순간들</SectionTitle>
          <Gallery images={invite.media.gallery} />
        </section>
      ) : null} */}
      
      {invite.media.video ? <Video url={invite.media.video.url} thumbnail={invite.media.video.thumbnail} /> : null}

      <section className="section container">
        <SectionTitle>연락하기</SectionTitle>
        <div className="card p-6 shadow-soft text-center animate-scaleIn animate-delay-300 hover-lift">
          <p className="text-muted mb-6 animate-fadeInDown animate-delay-500">궁금한 점이 있으시면 언제든 연락주세요</p>
          
          <div className="space-y-4">
            <div className="animate-fadeInLeft animate-delay-700">
              <p className="text-sm text-muted mb-2">아빠 ({invite.parents.dad})</p>
              <div className="flex gap-3 justify-center">
                <a className="btn btn-outline hover-lift animate-pulse" href={`tel:${invite.parents.dadPhone}`}>
                  📞 전화하기
                </a>
                <a className="btn btn-outline hover-lift animate-pulse animate-delay-200" href={`sms:${invite.parents.dadPhone}`}>
                  💬 문자하기
                </a>
              </div>
            </div>
            
            <div className="animate-fadeInRight animate-delay-1000">
              <p className="text-sm text-muted mb-2">엄마 ({invite.parents.mom})</p>
              <div className="flex gap-3 justify-center">
                <a className="btn btn-outline hover-lift animate-pulse animate-delay-300" href={`tel:${invite.parents.momPhone}`}>
                  📞 전화하기
                </a>
                <a className="btn btn-outline hover-lift animate-pulse animate-delay-500" href={`sms:${invite.parents.momPhone}`}>
                  💬 문자하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Guestbook enabled={invite.options?.guestbook} />

      <footer className="section container pb-32">
        <div className="card p-6 shadow-soft animate-slideInUp animate-delay-200 hover-glow">
          <div className="flex items-center justify-between text-sm">
            <div className="animate-fadeInLeft animate-delay-500">
              <CopyLink />
            </div>
            <a className="text-muted hover:text-brand transition-colors underline animate-fadeInRight animate-delay-700 hover-lift" href="#">개인정보 처리 안내</a>
          </div>
        </div>
      </footer>

      <FloatingBar mapUrl={invite.map?.kakao || invite.map?.naver} />
      </div>
    </>
  );
}
