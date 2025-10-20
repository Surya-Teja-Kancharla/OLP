function success(res, data = {}, message = 'OK', code = 200) {
  return res.status(code).json({ success: true, message, data });
}

function error(res, message = 'Error', code = 500) {
  return res.status(code).json({ success: false, message });
}

module.exports = { success, error };
