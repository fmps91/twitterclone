//load test type
//https://grafana.com/docs/k6/next/testing-guides/test-types/

/* Pruebas de carga promedio o Average-load testing

Una prueba de carga promedio evalúa cómo se desempeña el sistema bajo una carga típica. La carga típica puede ser un día normal de producción o un momento promedio.

Las pruebas de carga promedio simulan la cantidad de usuarios simultáneos y solicitudes por segundo que reflejan comportamientos promedio en el entorno de producción. Este tipo de prueba normalmente aumenta el rendimiento o las VU gradualmente y mantiene esa carga promedio durante algún tiempo. Dependiendo de las características del sistema, la prueba puede detenerse repentinamente o tener un breve período de reducción.
 */
//https://grafana.com/docs/k6/next/testing-guides/test-types/stress-testing/

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
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
    // MORE STEPS
    // Here you can have more steps or complex script
    // Step1
    // Step2
    // etc.
    check(urlRes, {
      'response code was 200': (res) => res.status == 200,
    });
};