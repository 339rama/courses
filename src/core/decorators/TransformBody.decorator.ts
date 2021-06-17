import { createParamDecorator, ExecutionContext } from '@nestjs/common';

function camelToUnderscore(key: string) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export const TransformedBody = createParamDecorator(async (_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const data = req.body;
  const mutated = {};
  for (var camel in data) {
    mutated[camelToUnderscore(camel)] = data[camel];
  }
  return mutated;
});
