export type BankAccount = {
  bank: string;
  owner: string;
  account: string;
};

export type InviteData = {
  invite: {
    baby: {
      name: string;
      birthDate: string;
      story?: string;
    };
    parents: {
      mom: string;
      dad: string;
      momPhone?: string;
      dadPhone?: string;
    };
    event: {
      date: string; // YYYY-MM-DD
      time: string; // HH:mm
      venue: {
        name: string;
        address: string;
        phone?: string;
        parking?: string;
        notes?: string;
      };
    };
    map: {
      naver?: string;
      kakao?: string;
      lat?: number;
      lng?: number;
    };
    media: {
      cover: string;
      gallery?: string[];
      video?: {
        url: string;
        thumbnail: string;
      };
    };
    bank?: {
      brideSide?: BankAccount[];
      groomSide?: BankAccount[];
    };
    options?: {
      guestbook?: boolean;
      bgm?: boolean;
      showDday?: boolean;
    };
  };
};

export type GuestbookItem = {
  id: string;
  name?: string;
  message: string;
  createdAt: string;
}; 