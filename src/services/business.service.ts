import {IBusinessData} from "../interfaces/IBusinessData"
import Settings from "../config/settings"

const headers: Headers = new Headers()
headers.set('Content-Type', 'application/json')
headers.set('Accept', 'application/json')

function getBusinessData(): Promise<IBusinessData[]>{
  const request: RequestInfo = new Request(Settings.businessDataUrl, {
    method: 'GET',
    headers: headers
  })

  return fetch(request)
    .then(res => res.json())
    .then(res => {
    return res as IBusinessData[]
  })
}

export default getBusinessData;