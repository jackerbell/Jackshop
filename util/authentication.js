const createUserSession = (req,user,action) => {  // 세션의 엑세스 요청을 받음,사용자데이터,세션이 업데이트 된 후 실행상태
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(action); // 세션이 성공적으로 저장이 되었다면 실행, auth.controllers의 createUsersession익명함수로 전달 
};

const deleteUserSession = (req) => {
  req.session.uid = null
};

module.exports = {
  createUserSession: createUserSession,
  deleteUserSession: deleteUserSession
};