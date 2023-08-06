/* eslint-disable @typescript-eslint/ban-types */
class WebWorker {
  worker: Worker

  constructor(worker: Function) {
    const code = worker.toString()
    const blob = new Blob(['(' + code + ')()'])
    this.worker = new Worker(URL.createObjectURL(blob))
  }

  postMessage(message: any) {
    this.worker.postMessage(message)
  }

  onmessage(callback: (event: MessageEvent) => void) {
    this.worker.onmessage = callback
  }
}

export default WebWorker
