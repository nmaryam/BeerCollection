
module.exports = {

	success:function (data ,baseUrl,videoBaseUrl='') {
		return ({
			"status"		: "success",
			"message"		: "Data Found Successfully",
			"code"			: 200,
			"timestamp"		: new Date().toUTCString(),
			"baseUrl"		: baseUrl,
			"videoBaseUrl"	:videoBaseUrl,
			"data"			: data
		});
	},
	error:function (err) {
		return ({
			"status"	: "fail",
			"message"	: "Fail to find Data",
			"code"		: 404,
			"timestamp"	: new Date().toUTCString(),
			"error"		: err
		});
	},
	errorResponse:function (message,code,err) {
		return ({
			"status"	: "fail",
			"message"	: message,
			"code"		: code,
			"timestamp"	: new Date().toUTCString(),
			"error"		: err
		});
	},
	response:function (data,status,message,code) {
		return ({
			"status"	: status,
			"message"	: message,
			"code"		: code,
			"timestamp"	: new Date().toUTCString(),
			"data"		: data
		});
	}

};