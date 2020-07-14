export function ajax(path, data = {}, method = 'POST') {
	let PATH_DOMAIN = this.$SERVICE_DOMAIN;
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${PATH_DOMAIN}${path}`,
			data: data,
			method: method,
			header: {
				'token': uni.getStorageSync('token')
			},
			success: res => {
				resolve(res.data);
			},
			fail: err => {
				reject(err);
			}
		});
	});
}