export function wrapperEnv(env: Recordable): ImportMetaEnv {
  const convertedEnv: any = {};
  for (const name of Object.keys(env)) {
    let value = env[name].replace(/\\n/g, '\n');
    // handle bool type
    switch (value) {
      case 'true':
        value = true;
        break;
      case 'false':
        value = false;
        break;
      default:
        break;
    }
    // handle other type
    switch (name) {
      case 'VITE_SERVER_PORT':
        value = Number(value);
        break;
      case 'VITE_USE_PROXY_OPTIONS':
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch (error) {
          value = [];
        }
        break;
      default:
        break;
    }
    convertedEnv[name] = value;
    // handle process env
    switch (typeof value) {
      case 'string':
        process.env[name] = value;
        break;
      case 'object':
        process.env[name] = JSON.stringify(value);
        break;
      default:
        break;
    }
  }
  return convertedEnv;
}
