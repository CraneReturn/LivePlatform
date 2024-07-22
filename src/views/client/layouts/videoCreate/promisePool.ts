import {BehaviorSubject} from 'rxjs'
type AsyncFunction=()=>Promise<any>
export class PromisePool{
    private readonly queue: { fn: AsyncFunction, index: number }[] = []
    private readonly maxCountcurrentTasks:number
    private results:any[]=[]
    curRunningCount =new BehaviorSubject(0)
    constructor(
        functions:AsyncFunction[],
        maxCountcurrentTasks:number=navigator.hardwareConcurrency||8
    ){
        this.queue = functions.map((fn, index) => ({ fn, index }))
        this.maxCountcurrentTasks=maxCountcurrentTasks
    }
    exec<T>(){
        return new Promise<T[]>((rs)=>{
            this.curRunningCount.subscribe((count: number)=>{
                if(count<this.maxCountcurrentTasks && this.queue.length!==0){
                    //需要跑的任务数量
                    let curTaskcount=this.maxCountcurrentTasks-count
                    if(curTaskcount>this.queue.length){
                        curTaskcount=this.queue.length
                    }
                    const tasks=this.queue.splice(0,curTaskcount)
                    this.curRunningCount.next(this.curRunningCount.value+curTaskcount)
                    tasks.forEach((taskWrap)=>{
                        const {fn ,index}=taskWrap
                        fn().then((result)=>{
                            this.results[index]=result
                            console.log(result,'1111');
                            
                        }).catch((error)=>{
                            this.results[index]=error
                        }).finally(()=>{
                            this.curRunningCount.next(this.curRunningCount.value-1)
                        })

                    })
                }
                if(this.curRunningCount.value==0 && this.queue.length==0){
                    rs(this.results as T[])
                }
            })
        })
    }
}
