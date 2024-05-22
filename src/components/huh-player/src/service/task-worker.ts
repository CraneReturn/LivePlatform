export function initWorker() {

    const worker = new Worker(new URL('./mux.ts', import.meta.url));

    worker.postMessage([10, 20]);
    worker.onmessage = (event) => {
        console.log(event.data);
        
    };
    worker.onerror = (event) => {

    };

    
}