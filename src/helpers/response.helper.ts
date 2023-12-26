// response-formatter.helper.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseFormatter {
  private static response = {
    meta: {
      code: 200,
      status: 'success',
      message: null,
    },
    data: null,
  };

  success(data: any = null, message: string = null) {
    ResponseFormatter.response.meta.message = message;
    ResponseFormatter.response.data = data;

    return ResponseFormatter.buildResponse();
  }

  error(data: any = null, message: string = null, code: number = 400) {
    ResponseFormatter.response.meta.status = 'error';
    ResponseFormatter.response.meta.code = code;
    ResponseFormatter.response.meta.message = message;
    ResponseFormatter.response.data = data;

    return ResponseFormatter.buildResponse();
  }

  private static buildResponse() {
    const clonedResponse = JSON.parse(
      JSON.stringify(ResponseFormatter.response),
    );
    // Reset the response for the next call
    ResponseFormatter.resetResponse();
    return clonedResponse;
  }

  private static resetResponse() {
    ResponseFormatter.response = {
      meta: {
        code: 200,
        status: 'success',
        message: null,
      },
      data: null,
    };
  }
}
