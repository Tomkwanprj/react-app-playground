import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T extends Entity>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete<T extends Entity>(id: number) {
    return apiClient.delete<T>(`${this.endpoint}/${id}`);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(`${this.endpoint}/` + entity.id, entity);
  }

  add<T extends Entity>(entity: T) {
    return apiClient.post<T>(`${this.endpoint}`, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
