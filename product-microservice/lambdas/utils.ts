export type ResponseSchema = {
    statusCode: number;
    body: string;
    headers: { [key: string]: string | boolean };
}

export const buildResponse = (statusCode: number, body: any = undefined): ResponseSchema => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": true,
        },
    };
}
