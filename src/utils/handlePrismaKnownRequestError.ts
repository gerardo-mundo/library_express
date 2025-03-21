import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface PrismaErrorResponse {
  message: string;
  statusCode: number;
}

export const handlePrismaError = (error: unknown): PrismaErrorResponse => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P1000':
        return {
          message:
            'Error de autenticación con la base de datos. Verifica las credenciales.',
          statusCode: 401, // Unauthorized
        };
      case 'P1001':
        return {
          message:
            'No se puede conectar al servidor de la base de datos. Verifica que esté en ejecución.',
          statusCode: 503, // Service Unavailable
        };
      case 'P1002':
        return {
          message:
            'El servidor de la base de datos no respondió a tiempo. Intenta nuevamente.',
          statusCode: 504, // Gateway Timeout
        };
      case 'P1003':
        return {
          message:
            'La base de datos no existe. Verifica el nombre de la base de datos.',
          statusCode: 404, // Not Found
        };
      case 'P1012':
        return {
          message: 'Error en el esquema de Prisma. Verifica la configuración.',
          statusCode: 400, // Bad Request
        };

      // Validation and restriction errors
      case 'P2000':
        return {
          message: 'El valor proporcionado es demasiado largo para la columna.',
          statusCode: 400, // Bad Request
        };
      case 'P2001':
        return {
          message: 'El registro buscado no existe.',
          statusCode: 404, // Not Found
        };
      case 'P2002':
        return {
          message: 'Violación de restricción única.',
          statusCode: 409, // Conflict
        };
      case 'P2003':
        return {
          message: 'Violación de clave foránea.',
          statusCode: 400, // Bad Request
        };
      case 'P2025':
        return {
          message: 'Registro no encontrado.',
          statusCode: 404, // Not Found
        };

      // Prisma´s unknown errors
      default:
        return {
          message: `Error de Prisma: ${error.message}`,
          statusCode: 500, // Internal Server Error
        };
    }
  } else if (error instanceof Error) {
    // Handle generic errors
    return {
      message: `${error.message}`,
      statusCode: 500, // Internal Server Error
    };
  } else {
    // Handle unknown errors
    return {
      message: 'Error desconocido en el servidor.',
      statusCode: 500, // Internal Server Error
    };
  }
};
