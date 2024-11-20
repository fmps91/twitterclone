//load test type

/* Prueba de remojo o Soak testing

La prueba de remojo es otra variación de la prueba de carga promedio. Se centra en periodos prolongados, analizando lo siguiente:

La degradación del rendimiento y el consumo de recursos del sistema durante períodos prolongados.
La disponibilidad y estabilidad del sistema durante períodos prolongados.
La prueba de inmersión se diferencia de una prueba de carga promedio en la duración de la prueba. En una prueba de inmersión, la duración máxima de la carga (generalmente una cantidad promedio) se extiende por varias horas e incluso días. Aunque la duración es considerablemente mayor, los períodos de aceleración y desaceleración de una prueba de inmersión son los mismos que los de una prueba de carga promedio.
 */
//https://grafana.com/docs/k6/next/testing-guides/test-types/soak-testing/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
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