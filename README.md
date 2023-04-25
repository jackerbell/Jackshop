# Jackshop (2023-04-23 Version 1)

이번 프로젝트의 UI는 매우 단순한 구성입니다.
이전에 제대로 구현하지 못했던 반응형과 더불어 로그인/로그아웃 세션 인증, 장바구니 등의 기능들을 추가했고,
일반 유저와 관리자가 접근하는 페이지를 다르게 만들었습니다.
이번엔 순수하게 모든 부분이 독학으로 진행하여 어려움이 많았습니다.
아직 일부 CSS 및 기능 상 고쳐야할 부분이 있지만 전반적인 프로세스가 완성되어 첫 번째 버전을 올렸습니다.

## 프로젝트 실행 환경

View: wide monitor, laptop, smartphone.. (반응형 적용)

CodeEditor: Visual Studio Code

Client UI: HTML5/CSS3 JAVASCRIPT

SERVER: NODEJS(express) (Heroku 배포)

DB: NoSQL(MongoDB) (MongoDB Atlas)

배포: <a href="https://radiant-coast-52483.herokuapp.com/products" target="_blank">JackShop!</a> 사이트에 접속하실 수 있습니다.

## 구현 기능
* 로그인/로그아웃
* 회원가입
* 관리자(물품등록, 삭제, 주문관리, 등록정보 수정).. 세션 수명 주기: 2일 
* 클라이언트(물품 보기, 장바구니)  
* 결제 기능(스트라이프 API)
* csrf 보안

## 계정 정보
* 운영자 : id : admin@admin.com / pw : admin1234
* 사용자 : id : abc@test.com/ qw : test1234
* 사용자의 경우 계정 생성을 통해 새로 등록하셔도 상관없습니다.

## 현황
물품 리스트 CSS 보완 필요, 
세션 시험을 위해 장바구니 기능이 로컬 세션 기준으로 저장되어 다른 유저로 로그인해도 동일한 장바구니가 보임.. → Cart Model, Controller에서 동작 재정의 
그 밖에 수정할 점 및 보완작업 진행중

## 리뷰
일전에 <a href="https://github.com/jackerbell/Morafi" target="_blank">Morafi</a>의 경우에는 디자인 패턴도 관계형 DB의 특성도 제대로 다루지 못했던 프로젝트였습니다.
보완하려고 헀지만, 다시 정리하는데 시간이 상당부분 소요되었습니다.
이 프로젝트를 시작하기로한 계기이기도한데, MVC 패턴 및 복잡한 SQL DB 대신 좀 더 유동적인 NOSQL DB를 써보았고, NPM에 관련된 유용한 패키지들이 많아서 프로젝트 관리가 훨씬 수월했습니다.
여전히 보완할 부분이 남았지만 반응형 동작 또한 무난한 편이라 생가하며 저번 작품에 비해서는 확실히 많은 부분에서 개선이 되었다고 생각합니다.
이제 이 프로젝트에 대해서 정리하고 보완한 후 다시 리액트 프로젝트를 진행해볼 예정입니다.


