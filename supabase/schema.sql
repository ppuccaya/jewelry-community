-- ==========================================
-- 종로 주얼리 2세 모임 관리 웹 DB 스키마
-- Supabase SQL Editor에 붙여넣기 후 실행
-- ==========================================

-- 멤버 테이블
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  joined_at date not null default current_date,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

-- 행사(이벤트) 테이블
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  time text,           -- "HH:MM" 형식
  location text,
  notes text,
  created_at timestamptz not null default now()
);

-- 행사 참석자
create table if not exists event_attendees (
  event_id uuid references events(id) on delete cascade,
  member_id uuid references members(id) on delete cascade,
  primary key (event_id, member_id)
);

-- 행사 사진
create table if not exists event_photos (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  storage_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

-- 콘텐츠 아이디어
create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tag text not null default '기타' check (tag in ('친목', '문화', '여행', '비즈니스', '기타')),
  status text not null default '아이디어' check (status in ('아이디어', '검토중', '확정', '완료')),
  reaction_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- 회비 납부
create table if not exists dues (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete cascade,
  year integer not null,
  month integer not null check (month between 1 and 12),
  paid boolean not null default false,
  unique (member_id, year, month)
);

-- 행사 비용
create table if not exists event_costs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  amount integer not null,
  description text,
  created_at timestamptz not null default now()
);

-- 입회 문의
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text,
  created_at timestamptz not null default now()
);

-- ==========================================
-- RLS (Row Level Security) 설정
-- ==========================================

-- 랜딩 페이지용 공개 읽기 (events, event_photos)
alter table events enable row level security;
alter table event_photos enable row level security;
alter table members enable row level security;
alter table event_attendees enable row level security;
alter table ideas enable row level security;
alter table dues enable row level security;
alter table event_costs enable row level security;
alter table inquiries enable row level security;

-- 공개 읽기 정책 (랜딩 페이지 갤러리용)
create policy "누구나 행사 조회 가능" on events for select using (true);
create policy "누구나 행사 사진 조회 가능" on event_photos for select using (true);

-- 입회 문의는 누구나 등록 가능
create policy "누구나 문의 등록 가능" on inquiries for insert with check (true);

-- 인증된 사용자(어드민)만 나머지 조작 가능
create policy "어드민만 행사 생성/수정/삭제" on events for all using (auth.role() = 'authenticated');
create policy "어드민만 사진 생성/삭제" on event_photos for all using (auth.role() = 'authenticated');
create policy "어드민만 멤버 관리" on members for all using (auth.role() = 'authenticated');
create policy "어드민만 참석자 관리" on event_attendees for all using (auth.role() = 'authenticated');
create policy "어드민만 아이디어 관리" on ideas for all using (auth.role() = 'authenticated');
create policy "어드민만 회비 관리" on dues for all using (auth.role() = 'authenticated');
create policy "어드민만 행사 비용 관리" on event_costs for all using (auth.role() = 'authenticated');
create policy "어드민만 문의 조회" on inquiries for select using (auth.role() = 'authenticated');

-- ==========================================
-- Storage 버킷 생성 (Supabase Storage)
-- ==========================================
-- Supabase 대시보드 > Storage 에서 수동으로 생성:
-- 버킷명: event-photos
-- Public: true
-- 또는 아래 SQL 사용:
insert into storage.buckets (id, name, public)
values ('event-photos', 'event-photos', true)
on conflict do nothing;

create policy "누구나 사진 조회 가능" on storage.objects
  for select using (bucket_id = 'event-photos');

create policy "어드민만 사진 업로드" on storage.objects
  for insert with check (
    bucket_id = 'event-photos' and auth.role() = 'authenticated'
  );

create policy "어드민만 사진 삭제" on storage.objects
  for delete using (
    bucket_id = 'event-photos' and auth.role() = 'authenticated'
  );
