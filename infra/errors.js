export class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotImplementedError';
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || 'Serviço indisponível no momento', {
      cause: cause || undefined,
    });
    this.name = 'ServiceError';
    this.action =
      'Verifique se o serviço está disponível, configurado corretamente, ou se ocorreu um erro do serviço';
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class BadRequestError extends Error {
  constructor({ message, action, cause }) {
    super(message || 'Os dados recebidos estão inválidos', {
      cause: cause || undefined,
    });
    this.name = 'BadRequestError';
    this.action = action || 'Verifique se os dados enviados estão corretos';
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class UnauthorizedError extends Error {
  constructor({ message, action, cause }) {
    super(message || 'Usuário não autenticado', {
      cause: cause || undefined,
    });
    this.name = 'UnauthorizedError';
    this.action = action || 'Realize a autenticação';
    this.statusCode = 401;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ForbiddenError extends Error {
  constructor({ message, action, cause }) {
    super(message || 'Usuário não possui acesso ao recurso', {
      cause: cause || undefined,
    });
    this.name = 'ForbiddenError';
    this.action = action || 'Solicite acesso ao recurso';
    this.statusCode = 403;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  constructor({ message, action, cause }) {
    super(message || 'Recurso não existe', {
      cause: cause || undefined,
    });
    this.name = 'NotFoundError';
    this.action =
      action || 'Verifique se o recurso existe ou se foi criado corretamente.';
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ConflictError extends Error {
  constructor({ message, action, cause }) {
    super(message || 'Recurso já existente', {
      cause: cause || undefined,
    });
    this.name = 'ConflictError';
    this.action = action || 'Crie um recurso que não exista ainda';
    this.statusCode = 409;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
