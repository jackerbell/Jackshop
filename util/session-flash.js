// 세션에 일부 데이터 적용가능, 이를 플래싱이라고 함.
// 다음 요청 주기동안만 존재, get 요청과 함께 가입페이지 제공

const getSessionData = (req) => {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
}

const flashDataToSession = (req,data,action) => { // 세션에 엑세스하기 위한 요청객체, 플래쉬해야하는 데이터, 
  req.session.flashedData = data;
  req.session.save(action);
}

module.exports = {
  getSessionData : getSessionData,
  flashDataToSession : flashDataToSession
}