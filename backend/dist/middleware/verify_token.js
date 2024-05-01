"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var jwt = require('jsonwebtoken');
function authenticateJWT(req, res, next) {
  var authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Missing or invalid token. Authentication failed.'
    });
  }
  var token = authHeader.substring(7); // Loại bỏ tiền tố 'Bearer ' để chỉ lấy token

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token. Authentication failed.'
      });
    }
    req.user = user;
    next();
  });
}
var _default = authenticateJWT;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqd3QiLCJyZXF1aXJlIiwiYXV0aGVudGljYXRlSldUIiwicmVxIiwicmVzIiwibmV4dCIsImF1dGhIZWFkZXIiLCJoZWFkZXIiLCJzdGFydHNXaXRoIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJ0b2tlbiIsInN1YnN0cmluZyIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiZXJyIiwidXNlciIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL3ZlcmlmeV90b2tlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuXHJcbmZ1bmN0aW9uIGF1dGhlbnRpY2F0ZUpXVChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXIoJ0F1dGhvcml6YXRpb24nKTtcclxuICAgIFxyXG4gICAgaWYgKCFhdXRoSGVhZGVyIHx8ICFhdXRoSGVhZGVyLnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAnTWlzc2luZyBvciBpbnZhbGlkIHRva2VuLiBBdXRoZW50aWNhdGlvbiBmYWlsZWQuJyB9KTtcclxuICAgIH1cclxuICBcclxuICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlci5zdWJzdHJpbmcoNyk7IC8vIExv4bqhaSBi4buPIHRp4buBbiB04buRICdCZWFyZXIgJyDEkeG7gyBjaOG7iSBs4bqleSB0b2tlblxyXG4gIFxyXG4gICAgand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCwgKGVyciwgdXNlcikgPT4ge1xyXG4gICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHsgbWVzc2FnZTogJ0ludmFsaWQgdG9rZW4uIEF1dGhlbnRpY2F0aW9uIGZhaWxlZC4nIH0pO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHJlcS51c2VyID0gdXNlcjtcclxuICAgICAgbmV4dCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG5leHBvcnQgZGVmYXVsdCBhdXRoZW50aWNhdGVKV1QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUVuQyxTQUFTQyxlQUFlQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0VBQ3JDLElBQU1DLFVBQVUsR0FBR0gsR0FBRyxDQUFDSSxNQUFNLENBQUMsZUFBZSxDQUFDO0VBRTlDLElBQUksQ0FBQ0QsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQ0UsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0lBQ3BELE9BQU9KLEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFBRUMsT0FBTyxFQUFFO0lBQW1ELENBQUMsQ0FBQztFQUM5RjtFQUVBLElBQU1DLEtBQUssR0FBR04sVUFBVSxDQUFDTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7RUFFdkNiLEdBQUcsQ0FBQ2MsTUFBTSxDQUFDRixLQUFLLEVBQUVHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLEVBQUUsVUFBQ0MsR0FBRyxFQUFFQyxJQUFJLEVBQUs7SUFDdkQsSUFBSUQsR0FBRyxFQUFFO01BQ1AsT0FBT2QsR0FBRyxDQUFDSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUFFQyxPQUFPLEVBQUU7TUFBd0MsQ0FBQyxDQUFDO0lBQ25GO0lBRUFSLEdBQUcsQ0FBQ2dCLElBQUksR0FBR0EsSUFBSTtJQUNmZCxJQUFJLENBQUMsQ0FBQztFQUNSLENBQUMsQ0FBQztBQUNKO0FBQUMsSUFBQWUsUUFBQSxHQUVZbEIsZUFBZTtBQUFBbUIsT0FBQSxjQUFBRCxRQUFBIn0=