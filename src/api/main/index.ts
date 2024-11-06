import request from '@/utils/request'
enum Api {
  NAME = 'xxxxx',
}

export const nameApi = () => request.get<any, any>(Api.NAME)
