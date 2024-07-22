import service from "@/utils/request";

export function getAllbarrages(first:any,pageNum:any,pageSize:any,videoId:any) {   
    return service({
      url: `/video/getBarrage?first=${first}&pageNum=${pageNum}&pageSize=${pageSize}&videoId=${videoId}`,
      method: "get",
      headers: {
        isToken: true,
      },
    });
  }