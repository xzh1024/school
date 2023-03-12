import request from "@/utils/request";
export function getUploadToken() {
  return request({
    url: "/img/upToken"
  });
}

export function getUpload(type, data) {
  return request({
    module: "erp",
    url: "/upload?bucket=" + type,
    method: "post",
    data,
    contentType: "multipart/form-data;"
  });
}

export function getUploads(type, params) {
  const form = new FormData();
  if (Array.isArray(params.file)) {
    params.file.forEach(file => {
      form.append("file", file, file.name);
    });
  } else {
    form.append("file", params.file, params.file.name);
  }
  return request({
    module: "erp",
    method: "post",
    url: "/upload?bucket=" + type,
    headers: { "Content-Type": "multipart/form-data" },
    data: form
  });
}

// export function getUploadToken() {
// 	return request({
// 		module: 'chats',
// 		url: '/qiniu-token',
// 		params: {
// 			type: 2
// 		}
// 	});
// }
