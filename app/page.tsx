import { getInvite } from "@/app/lib/invite";
import SectionTitle from "@/app/components/SectionTitle";
import Hero from "@/app/components/Hero";
import Video from "@/app/components/Video";
import Guestbook from "@/app/components/Guestbook";
import FloatingBar from "@/app/components/FloatingBar";
import CopyLink from "@/app/components/CopyLink";
import ClientWrapper from "@/app/components/ClientWrapper";
import Calendar from "@/app/components/Calendar";
import Timeline from "@/app/components/Timeline";
import TimeCounter from "@/app/components/TimeCounter";
import ScrollAnimation from "@/app/components/ScrollAnimation";
import { formatKoreanDate } from "@/app/lib/format";
import Image from "next/image";

export default async function Page() {
  const invite = await getInvite();
  const partyDate = invite.event.date;
  const birthday = invite.baby.birthDate;

  return (
    <ClientWrapper>
      <div className="font-sans min-h-screen">
        <Hero 
          name={invite.baby.name} 
          cover={invite.media.cover} 
          eventDate={partyDate} 
          showDday={invite.options?.showDday} 
          venue={invite.event.venue.address}
        />

      <ScrollAnimation>
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
      </ScrollAnimation>

      <ScrollAnimation delay={200}>
        <section className="section container">
          <SectionTitle>우진이와 함께하는 특별한 날</SectionTitle>
          <div className="card p-4 shadow-soft animate-fadeInUp animate-delay-300 hover-lift">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* 아기 소개 섹션 */}
              <div className="flex flex-col items-center">
                {/* 아기 사진 */}
                <div className="flex justify-center ">
                  <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[400px] overflow-hidden rounded-2xl animate-rotateIn animate-delay-500">
                    <Image 
                      src="/images/woojin-03.jpg" 
                      alt={`우진 소개`} 
                      fill 
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px" 
                      style={{ objectFit: "contain" }} 
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                

                {invite.baby.story ? (
                  <div className="mt-6 animate-slideInUp animate-delay-1000">
                    <p className="text-center text-muted italic leading-relaxed whitespace-pre-line">&ldquo;{invite.baby.story}&rdquo;</p>
                  </div>
                ) : null}
              </div>

              {/* 달력 컴포넌트 */}
              <div className="animate-fadeInRight animate-delay-500 flex justify-center">
                <Calendar 
                  eventDate={partyDate} 
                  eventTime={invite.event.time}
                  venue={invite.event.venue.name}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={400}>
        <section className="section container">
          <SectionTitle>우진이의 성장 이야기</SectionTitle>
          <div className="animate-fadeInUp animate-delay-300">
            <Timeline />
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={600}>
        <section className="section container">
          <SectionTitle>우진이가 세상과 함께한 시간</SectionTitle>
          <div className="space-y-12">
            {/* 세상과 함께한 시간 */}
            <div className="text-center space-y-6 animate-fadeInUp">
              <TimeCounter />
            </div>

            {/* 첫 생일 축하 메시지 */}
            <div className="card p-8 sm:p-12 shadow-soft text-center animate-fadeInUp animate-delay-300 hover-lift">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800" style={{ fontFamily: "Paperlogy-6SemiBold, sans-serif" }}>
                    우리 우진 첫 생일
                  </h3>
                  <p className="text-lg sm:text-xl text-muted" style={{ fontFamily: "Paperlogy-6SemiBold, sans-serif" }}>
                    많이 축하해주세요:)
                  </p>
                </div>

                {/* 우진이 사진 */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] overflow-hidden rounded-2xl shadow-lg animate-scaleIn animate-delay-500">
                    <Image 
                      src="/images/woojin/woojin-05.jpg" 
                      alt="우진이 첫 생일" 
                      fill 
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px" 
                      style={{ objectFit: "cover" }} 
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* 하단 로고 및 저작권 */}
                <div className="space-y-4 pt-8 border-t border-gray-100">
                  <div className="flex justify-center">
                    <div className="text-lg font-serif text-gray-400 italic">
                      Salon de Letter
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    COPYRIGHT NeedIT. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* {invite.media.gallery?.length ? (
        <section className="section container">
          <SectionTitle>소중한 순간들</SectionTitle>
          <Gallery images={invite.media.gallery} />
        </section>
      ) : null} */}
      
      {invite.media.video ? <Video url={invite.media.video.url} thumbnail={invite.media.video.thumbnail} /> : null}

      <ScrollAnimation delay={800}>
        <section className="section container">
          <SectionTitle>연락하기</SectionTitle>
          <div className="card p-6 shadow-soft text-center animate-scaleIn animate-delay-300 hover-lift">
            <p className="text-muted mb-6 animate-fadeInDown animate-delay-500">궁금한 점이 있으시면 언제든 연락주세요</p>
            
            <div className="space-y-4">
              <div className="animate-fadeInLeft animate-delay-700">
                <p className="text-sm text-muted mb-2">아빠 ({invite.parents.dad})</p>
                <div className="flex justify-center">
                  <a className="btn btn-outline hover-lift animate-pulse" href={`tel:${invite.parents.dadPhone}`}>
                    📞 전화하기
                  </a>
                </div>
              </div>
              
              <div className="animate-fadeInRight animate-delay-1000">
                <p className="text-sm text-muted mb-2">엄마 ({invite.parents.mom})</p>
                <div className="flex justify-center">
                  <a className="btn btn-outline hover-lift animate-pulse animate-delay-300" href={`tel:${invite.parents.momPhone}`}>
                    📞 전화하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation delay={1000}>
        <Guestbook enabled={invite.options?.guestbook} />
      </ScrollAnimation>

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
    </ClientWrapper>
  );
}
