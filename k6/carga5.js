//load test type

/* Prueba de picos  o Spike testing

Los diferenciadores clave de la prueba de picos son la simulación de cargas repentinas y muy altas. Carece de una duración meseta (carga completa) o suele ser breve.

A veces, la prueba puede requerir una meseta de carga durante algún tiempo. Si se necesita una meseta, generalmente es corta. Una reducción gradual también puede ser rápida o innecesaria, ya que el objetivo es aumentar repentinamente la carga del sistema.
 */
//https://grafana.com/docs/k6/next/testing-guides/test-types/spike-testing/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Soak test in this section
  stages: [
    { duration: '2m', target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '1m', target: 0 }, // quick ramp-down to 0 users
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