//load test type

/* Pruebas de punto de interrupción o Breakpoint testing

Las pruebas de puntos de interrupción tienen como objetivo encontrar los límites del sistema. Las razones por las que quizás desee conocer los límites incluyen:

Ajustar o cuidar los puntos débiles del sistema para reubicar esos límites superiores en niveles más altos.
Para ayudar a planificar los pasos de remediación en esos casos y prepararse para cuando el sistema se acerque a esos límites.
En otras palabras, saber dónde y cómo empieza a fallar un sistema ayuda a prepararse para esos límites.

Un punto de quiebre aumenta hasta alcanzar cifras irrealmente altas. Esta prueba normalmente debe detenerse de forma manual o automática cuando los umbrales comienzan a fallar. Cuando aparecen estos problemas, el sistema ha llegado a sus límites.
 */
//https://grafana.com/docs/k6/next/testing-guides/test-types/breakpoint-testing/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Soak test in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
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