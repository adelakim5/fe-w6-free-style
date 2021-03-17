# fe-w6-free-style

### flow

1. 질문 -> 답변
2. 모든 질문에 답변 후 Url(express /web?type=entp&scores=909090)
3. /web?type=entp&scores=909090 -> 어떤 일을 해줘야하나??

### 만들어야 할 페이지

1. 인덱스 페이지(/)

   1. 대문 같은 존재
   2. 16가지의 mbti를 볼 수 있게 되어있음
   3. index.html
   4. res.send("/index.html");
   5. 여기는 index만의 html, css

2. 챗봇에서 사용자가 연결되어 들어오는 페이지
   1. url의 쿼리스트링에 해당하는 mbti 정보를 보여주는 페이지
   2. 설명, 이미지 등이 있음
   3. 사용자가 이 페이지로 들어오는 경우 html 파일을 보내줌
   4. javascript에서 location.search를 이용해서 쿼리 파싱
   5. 파싱한 쿼리를 fetch("/web?type=entp&scores=909090")으로 보내서 json 데이터를 받아옴
   6. 받아온 데이터를 dom으로 만들어서 보여줌
   7. 사용자는 받아서 행복하게 자신의 mbti를 즐김
   8. result.html
   9. res.send("result.html");
   10. 그래서 여기는 result만의 js, css

**둘 다 같은 js, css 써도 상관없긴 함**

### 만들어야 하는 API

1. mbti의 데이터를 가지고 있으며 해당 데이터를 json 데이터로 응답
   1. 현재 프로젝트에서는 /web?type=entp&scores=909090 친구가 담당하고 있음
   2. 요기서 16가지의 데이터를 보내줌
