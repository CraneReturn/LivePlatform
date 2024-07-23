import service from "@/utils/request";
export function uploadFileonce(file: any, chunk: any, md5: any, total: any) {
  return service({
    url: `/video/uploadSlice?chunk=${chunk}&md5=${md5}&total=${total}`,
    headers: {
      isToken: true,
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: file
  })
}
export function mergerFiles(fileName: any, md5: any) {
  return service({
    url: `/video/uploadVideoMerge?fileName=${fileName}&md5=${md5}`,
    headers: {
      isToken: true,
    },
    method: 'post',
  })
}
export function getrestStarIndexArr(md5: any) {
  console.log(md5);

  return service({
    url: `/video/getNoUp?md5=${md5}`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })
}
//获取一级分类
export function getOneSort() {
  return service({
    url: `/video/getOnSort`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })
}
//获取二级分类
export function getTwoType(id: any) {
  return service({
    url: `/video/getTwo?sortId=${id}`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })

}
//上传图片文件
export function sendCoverimg(formdata: any) {
  return service({
    url: `/video/upCover`,
    headers: {
      isToken: true,
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: formdata
  })

}
export function sendCoverimgframe(formdata: any) {
  const base64Data = formdata.replace(/^data:image\/png;base64,/, '');
  // 去除整体的双引号
  const cleanedData = base64Data.replace(/^"|"$/g, '');
  const rawData = cleanedData;
  return service({
    url: `/video/upFrame`,
    headers: {
      'Content-Type': 'text/plain' ,
      isToken: true,
    },
    data: rawData, // 直接使用 FormData 对象
    method: 'post',
  });
}

//上传视频
export function uploadVideo(sortId: any, videoCoverUrl: any,
   videoDesc: any, videoSource: any,
  videoTime: any, videoTitle: any, videoType: any, videoUrl: any,dynamicTags:[]) {
    console.log( sortId,
      videoCoverUrl,
      videoDesc,
      videoSource,
      videoTime,
      videoTitle,
      videoType,
      videoUrl,
   dynamicTags);
    
  if (videoType == '自制') {
    videoType = 0
  } else {
    videoType = 1
  }
  return service({
    url: `/video/upVideo`,
    headers: {
      isToken: true,
    },
    data: {
      sortId,
      videoCoverUrl,
      videoDesc,
      videoSource,
      videoTime,
      videoTitle,
      videoType,
      videoUrl,
      tipIds:dynamicTags
    },
    method: 'post',
  })
}
//添加标签
export function addnewtype(tips:string) {
  return service({
    url: `/tip/addTip?tipName=${tips}`,
    headers: {
      isToken: true,
    },
    method: 'post',
  });
}