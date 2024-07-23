import service from "@/utils/request";

export function createNewfanscom() {   
    return service({
      url: `/group/createGroup`,
      method: "post",
      headers: {
        isToken: true,
      },
    });
  }