//load test type
//https://grafana.com/docs/k6/next/testing-guides/test-types/

/* Prueba de humo o Smoke testing

Las pruebas de humo tienen una carga mínima. Ejecútelos para verificar que el sistema funcione bien con una carga mínima y para recopilar valores de rendimiento básicos.

Este tipo de prueba consiste en ejecutar pruebas con unas pocas VU; más de 5 VU podrían considerarse una prueba de minicarga.

De manera similar, la prueba debe ejecutarse durante un período corto, ya sea un número bajo de iteraciones o una duración de segundos a unos pocos minutos como máximo.
 */
//https://grafana.com/docs/k6/next/testing-guides/test-types/smoke-testing/

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '1m', // This can be shorter or just a few iterations
  };

export default () => {
    const url = `http://localhost:5000/api/auth/login`
    const payload = JSON.stringify({
      username: 'user1',
      password: '123456',
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const urlRes = http.post(url, payload, params);
    sleep(1);

    check(urlRes, {
      'response code was 200': (res) => res.status == 200,
    });
};

//tutorial
//para ejecutar normalmente
//k6 run 0.js
//para saber el comando que esatamos ejecutando pero no sabemos los parametros
//k6 run --help
//para ejecutar la prueba con 10 usuarios y la duracion de 30 segundos
//k6 run 0.js --vus 10 --duration 30s
//ejecutar 3 veces un script
//k6 run 0.js -i 3
