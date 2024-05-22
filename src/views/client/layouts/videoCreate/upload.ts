import SparkMD5 from "spark-md5"
export function getHash(file:File):Promise<any>{
    return new Promise((resolve,reject)=>{
        //通过sparkmd5 得到hash值 先获取buffer
        const fileReader=new FileReader()  
        fileReader.readAsArrayBuffer(file)
        fileReader.onload=(e)=>{
            const buffer=e.target?.result
            if(!buffer) reject()
            const hashArr=new SparkMD5.ArrayBuffer().append(buffer as ArrayBuffer).end()
            //获取文件后缀
            const suffix = (/\.([a-zA-Z0-9]+)$/.exec(file.name) as any)[1]
            resolve({
                hashArr,
                suffix
            })
        }
    })
}
export async function spliceViedo(count:number,file:File,maxSize: number,HASH: any,suffix: any){
    let index=0
    let chunks: any[]=[]
    while(index<count){
        const sliceFile=file.slice(index*maxSize,(index+1)*maxSize)
        chunks.push({
            file :sliceFile,
            name: `${HASH}_${index}.${suffix}`
        })
        index++;
    }
    return chunks
}