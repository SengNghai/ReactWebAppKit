import { sleep } from 'antd-mobile/es/utils/sleep'

let count = 0

type TItem = {
  avatar: string;
  name: string;
  description: string;
}


export async function mockRequest() {
 
const item: TItem = {
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
  }

  if (count >= 300) {
    return []
  }
  await sleep(1000);
  count++
  return [
    item
  ]
}