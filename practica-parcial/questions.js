// ============================================================
//  BANCO DE PRÁCTICAS — Comportamiento del Consumidor
//  Estructura: 6 preguntas por examen, igual que el parcial real
// ============================================================

// Tipos de pregunta soportados:
//   drag_drop      → arrastra conceptos a filas de una tabla
//   multi_part     → pregunta con partes A, B, C (texto libre o choice)
//   image_analysis → igual que multi_part pero con imagen encima

const BIAS_POOL_FRESHRUN = [
  { id: "b1", text: "Efecto anclaje" },
  { id: "b2", text: "Efecto default" },
  { id: "b3", text: "Escasez / FOMO" },
  { id: "b4", text: "Prueba social" },
  { id: "b5", text: "Efecto señuelo (Decoy)" },
  { id: "b6", text: "Efecto dotación" },
  { id: "b7", text: "Heurística de disponibilidad" },
  { id: "b8", text: "Sesgo de statu quo" }
];

const BIAS_POOL_URBANFIT = [
  { id: "u1", text: "Aversión a la pérdida" },
  { id: "u2", text: "Efecto señuelo (Decoy)" },
  { id: "u3", text: "Escasez / FOMO" },
  { id: "u4", text: "Efecto default / Statu quo" },
  { id: "u5", text: "Brecha intención–acción" },
  { id: "u6", text: "Prueba social" },
  { id: "u7", text: "Efecto anclaje" },
  { id: "u8", text: "Efecto dotación" }
];

const BIAS_POOL_PETAMIGO = [
  { id: "p1", text: "Aversión a los extremos" },
  { id: "p2", text: "Efecto dotación + Aversión a la pérdida" },
  { id: "p3", text: "Prueba social" },
  { id: "p4", text: "Efecto default / Statu quo" },
  { id: "p5", text: "Escasez / Urgencia" },
  { id: "p6", text: "Sesgo de statu quo / Inercia" },
  { id: "p7", text: "Efecto anclaje" },
  { id: "p8", text: "Heurística de afecto" }
];

const PRACTICE_EXAMS = [
  // ──────────────────────────────────────────
  //  PRÁCTICA 1: FRESHRUN
  // ──────────────────────────────────────────
  {
    id: 1,
    caseName: "FreshRun",
    caseSubtitle: "Delivery de comida saludable",
    caseShort: "App de delivery de comida saludable con modelo de suscripción.",
    caseDescription: "FreshRun es una startup de delivery de comida saludable que opera a través de una app. Ofrece tres planes: Básico (S/ 10), Pro (S/ 25) y VIP (S/ 28). Su audiencia principal son profesionales de 25–40 años que buscan opciones nutritivas sin perder tiempo. La tasa de retención al tercer mes es del 34%, y la empresa quiere entender por qué los usuarios abandonan y cómo mejorar la experiencia de compra.",
    caseData: [
      "Ticket promedio: S/ 29.90 por pedido.",
      "El 60% de pedidos los lunes entre 18:00–20:00 son del mismo usuario repitiendo el mismo plato.",
      "Tasa de conversión en checkout: 52% (abandono = 48%).",
      "El plan Pro (S/ 25) representa el 78% de las suscripciones a pesar de existir el VIP a S/ 28."
    ],
    sections: [
      // ── P1: Identificación de sesgos (Drag & Drop tabla) ──
      {
        id: "P1",
        title: "Identificación de sesgos y heurísticas",
        points: 3,
        questions: [
          {
            id: "fr_p1",
            type: "drag_drop",
            situation: `<strong>Pregunta 1 (3 pts)</strong><br>La siguiente tabla muestra 6 situaciones reales observadas en la app FreshRun. 
              Arrastra el concepto conductual correcto desde el banco de conceptos hacia la celda correspondiente. 
              Cada concepto puede usarse una sola vez.`,
            draggableItems: BIAS_POOL_FRESHRUN,
            dropZones: [
              { id: "z1", label: "El bowl de quinoa aparece a S/ 25.90 junto a un precio tachado de S/ 35.90. Las ventas suben 40%." },
              { id: "z2", label: "Al pagar, la casilla 'Donar S/ 1.00 para reforestación' aparece marcada por defecto. El 80% dona." },
              { id: "z3", label: "Un banner dice '¡Solo quedan 3 menús del Chef! Terminan en 8 minutos'. El usuario compra de inmediato." },
              { id: "z4", label: "Mensaje: 'Más de 500 personas en tu distrito pidieron aquí esta semana'." },
              { id: "z5", label: "FreshRun ofrece Plan Pro (S/ 25) y Plan VIP (S/ 28). El VIP hace que el Pro parezca irresistible." },
              { id: "z6", label: "Un usuario tiene 850 puntos acumulados. Le cuesta mucho cancelar porque 'ya los tiene'." }
            ],
            correct: {
              "z1": "b1",
              "z2": "b2",
              "z3": "b3",
              "z4": "b4",
              "z5": "b5",
              "z6": "b6"
            },
            explanation: "Precio tachado = Anclaje. Casilla premarcada = Default. Contador regresivo = Escasez/FOMO. Cantidad de usuarios = Prueba social. Plan VIP que empuja al Pro = Señuelo. Puntos acumulados que frenan la cancelación = Dotación.",
            session: "Sesiones 6, 7 y 8"
          }
        ]
      },
      // ── P2: Sistema 1/2 y Bucle de Hábito ──
      {
        id: "P2",
        title: "Sistema 1 / Sistema 2 y Bucle de Hábito",
        points: 3,
        questions: [
          {
            id: "fr_p2",
            type: "multi_part",
            situation: `<strong>Pregunta 2 (3 pts)</strong><br>
              <em>Daniela, 30 años, trabaja en banca de inversión. Todos los lunes a las 18:30, al salir agotada de la oficina, 
              abre FreshRun automáticamente y pide el mismo "Wrap de Pollo". Lo hace sin pensar, siente alivio al no 
              decidir qué comer, y al día siguiente se siente satisfecha de haber comido bien.</em>`,
            parts: [
              {
                id: "a",
                type: "free_text",
                label: "Parte A — Bucle de hábito (2 pts)",
                prompt: "Identifica con precisión los tres componentes del bucle de hábito de Daniela. Para cada componente, explica brevemente por qué corresponde a ese rol.",
                rubric: `<strong>Gatillo (Cue):</strong> Lunes 18:30 + agotamiento post-jornada. Es una señal contextual temporal y emocional que activa el comportamiento.<br>
                  <strong>Rutina (Routine):</strong> Abrir FreshRun y pedir automáticamente el Wrap de Pollo. Es la acción repetitiva impulsada por el Sistema 1, con bajo esfuerzo cognitivo.<br>
                  <strong>Recompensa (Reward):</strong> Alivio de no tener que pensar/decidir (reducción de carga cognitiva), más la satisfacción post-comida saludable.<br>
                  <em>Nota: la recompensa debe ser inmediata (alivio), no solo la satisfacción al día siguiente.</em>`
              },
              {
                id: "b",
                type: "free_text",
                label: "Parte B — Intervención conductual (1 pt)",
                prompt: "FreshRun quiere que Daniela pruebe sus nuevos 'Bowls Calientes'. Diseña UNA intervención conductual concreta que no rompa bruscamente el hábito pero lo modifique. Justifica usando conceptos del curso.",
                rubric: `<strong>Respuesta modelo:</strong> Mostrar un pop-up justo antes de confirmar el Wrap: <em>"¿Hoy probamos algo nuevo? Tu Bowl Caliente preferido + 50 pts de regalo por solo S/ 2 más."</em><br>
                  <strong>Justificación esperada:</strong> Permite que el gatillo (lunes/cansancio) active la rutina (abrir FreshRun), pero introduce fricción positiva mínima justo antes de la acción final, activando brevemente el Sistema 2 sin frustrar. Usa framing de ganancia (incentivo) y timing correcto (momento del hábito).<br>
                  <em>Aceptar cualquier intervención conductualmente justificada: habit stacking, nudge de timing, framing, etc.</em>`
              }
            ],
            explanation: "El bucle de hábito (Duhigg) requiere un gatillo contextual, una rutina automatizada (Sistema 1) y una recompensa inmediata. Para modificar el hábito, la intervención debe respetar el gatillo pero alterar la rutina con el menor esfuerzo posible.",
            session: "Sesiones 2 y 5"
          }
        ]
      },
      // ── P3: Pricing Conductual + Imagen de Checkout ──
      {
        id: "P3",
        title: "Pricing conductual y Framing",
        points: 4,
        questions: [
          {
            id: "fr_p3",
            type: "image_analysis",
            imageSrc: "assets/checkout-freshrun.png",
            imageCaption: "Pantalla de checkout de FreshRun — analiza los problemas de diseño conductual.",
            situation: `<strong>Pregunta 3 (4 pts)</strong><br>
              Observa la pantalla de checkout de FreshRun mostrada arriba. Un equipo de UX detectó 
              que el 48% de los usuarios abandona el carrito en este paso.`,
            parts: [
              {
                id: "a",
                type: "free_text",
                label: "Parte A — Identificación de problemas (2 pts)",
                prompt: "Identifica y nombra AL MENOS 3 problemas de diseño conductual presentes en la pantalla de checkout. Para cada uno, indica qué sesgo o principio explica por qué genera fricción o abandono.",
                rubric: `<strong>Problemas esperados (cualquier combinación de estos):</strong><br>
                  1. <strong>Tarifa de servicio oculta</strong> al final → genera <em>pain of paying</em> aumentado y sensación de engaño (viola expectativa del precio).<br>
                  2. <strong>Propina preseleccionada al 15%</strong> → Efecto default, pero percibido como manipulación cuando el monto es alto.<br>
                  3. <strong>Casilla de donación premarcada</strong> → Efecto default, puede generar rechazo si el usuario siente que no eligió.<br>
                  4. <strong>Precio total fragmentado</strong> → Decoupling de costos; el usuario no puede calcular fácilmente el total real antes de comprometerse.<br>
                  <em>Se espera que cada problema esté nombrado con el concepto conductual correspondiente.</em>`
              },
              {
                id: "b",
                type: "free_text",
                label: "Parte B — Intervención prioritaria (2 pts)",
                prompt: "De los problemas que identificaste, ¿cuál genera mayor impacto en la tasa de abandono? Propón una solución de rediseño concreta con justificación conductual.",
                rubric: `<strong>Problema de mayor impacto:</strong> La tarifa de servicio sorpresa (Drip pricing). Es el principal generador de abandono porque activa el <em>pain of paying</em> en el último momento, cuando el usuario ya tiene una expectativa de precio formada.<br>
                  <strong>Solución esperada:</strong> Mostrar el total real (incluyendo envío y tarifa de servicio) desde la pantalla del carrito, antes del checkout. Usar framing de "precio todo incluido" desde el inicio.<br>
                  <em>Aceptar otras soluciones bien justificadas: e.g., eliminar la propina preseleccionada, mostrar el total parcial en tiempo real conforme avanza.</em>`
              }
            ],
            explanation: "El drip pricing (precio por goteo) viola la expectativa formada por el anclaje inicial. La tarifa sorpresa activa el pain of paying más intensamente que si se hubiera mostrado desde el inicio.",
            session: "Sesiones 7 y 8"
          }
        ]
      },
      // ── P4: Arquitectura de Elección / Nudges ──
      {
        id: "P4",
        title: "Arquitectura de elección y Nudges",
        points: 3,
        questions: [
          {
            id: "fr_p4",
            type: "multi_part",
            situation: `<strong>Pregunta 4 (3 pts)</strong><br>
              FreshRun quiere aumentar el porcentaje de usuarios que se suscriben al plan mensual (actualmente el 
              22% de compradores frecuentes lo hace). El equipo tiene prohibido usar descuentos directos ni publicidad intrusiva.`,
            parts: [
              {
                id: "a",
                type: "free_text",
                label: "Parte A — Diseño de nudges (2 pts)",
                prompt: "Diseña 2 nudges conductuales concretos para aumentar la tasa de suscripción. Para cada uno: (1) descríbelo en detalle, (2) indica qué herramienta conductual usa, y (3) explica por qué funcionaría.",
                rubric: `<strong>Ejemplos de nudges válidos:</strong><br>
                  <strong>Nudge 1 (Defecto/Default):</strong> Cambiar el flujo de compra para que el checkout ofrezca por defecto "Agrega el plan mensual y este pedido cuesta S/ 5 menos". El usuario debe hacer clic activo para rechazarlo. → Usa el Efecto Default y el encuadre como pérdida (perder el descuento).<br>
                  <strong>Nudge 2 (Comparación social):</strong> Mostrar en el resumen del pedido: "El 68% de usuarios que compran esto 2+ veces/semana tienen plan mensual. Ahorran S/ 47/mes en promedio." → Usa Prueba Social + anclaje de ahorro.<br>
                  <em>Aceptar cualquier nudge bien descrito con sustento conductual. Penalizar si solo dicen "hacer una oferta" sin el mecanismo conductual.</em>`
              },
              {
                id: "b",
                type: "free_text",
                label: "Parte B — Debate ético (1 pt)",
                prompt: "Uno de tus nudges usa el efecto default (opt-out). Un colega argumenta que esto 'manipula' al consumidor. ¿Estás de acuerdo? Defiende tu postura con argumentos del curso.",
                rubric: `<strong>Respuesta equilibrada esperada:</strong><br>
                  <strong>A favor del opt-out:</strong> El opt-out no elimina la libertad de elección (sigue siendo posible desactivarlo). Thaler y Sunstein lo llaman 'paternalismo libertario': guiar hacia la mejor opción preservando la autonomía. Los defaults bien diseñados aumentan el bienestar cuando la opción default es la que le conviene al usuario.<br>
                  <strong>Límite ético:</strong> El problema surge cuando el default beneficia solo a la empresa (ej. donación preseleccionada sin que el usuario sepa). La transparencia y el fácil acceso para deshabilitar son requisitos éticos clave.<br>
                  <em>Aceptar posturas parciales bien argumentadas. Penalizar respuestas absolutas sin matiz.</em>`
              }
            ],
            explanation: "Un nudge es cualquier intervención que orienta la conducta sin eliminar opciones ni usar incentivos económicos. Los mejores nudges son transparentes, fáciles de revertir, y benefician al usuario.",
            session: "Sesión 6"
          }
        ]
      },
      // ── P5: Customer Decision Journey + Pricing ──
      {
        id: "P5",
        title: "Customer Decision Journey y Pricing",
        points: 4,
        questions: [
          {
            id: "fr_p5",
            type: "multi_part",
            situation: `<strong>Pregunta 5 (4 pts)</strong><br>
              <em>Marco, 28 años, trabaja remoto y busca comer más sano. Ve un anuncio de FreshRun en Instagram 
              con un bowl vegano. Lo guarda en favoritos. Tres días después lo recuerda, descarga la app, ve la 
              variedad y le encanta, pero al llegar al checkout ve la tarifa de servicio sorpresa y cierra la 
              app. Dos semanas después recibe un correo con 20% de descuento y finalmente compra.</em>`,
            parts: [
              {
                id: "a",
                type: "free_text",
                label: "Parte A — Mapeo CDJ (2 pts)",
                prompt: `Mapea el Customer Decision Journey de Marco en la siguiente estructura (completa cada etapa con lo que observas en el caso):
                
• TRIGGER (disparador): ¿Qué desencadena la necesidad?
• INITIAL CONSIDERATION (consideración inicial): ¿Qué marcas/opciones considera?  
• ACTIVE EVALUATION (evaluación activa): ¿Qué hace para decidir?
• MOMENT OF PURCHASE (momento de compra): ¿Qué ocurre y por qué casi falla?
• LOYALTY LOOP (bucle de lealtad): ¿Qué haría que vuelva sin necesidad de descuento?`,
                rubric: `<strong>Trigger:</strong> Anuncio en Instagram → necesidad latente de comer sano activada por un estímulo externo.<br>
                  <strong>Consideration:</strong> Solo FreshRun (el anuncio fue el primer punto de contacto). Guardar en favoritos = bajo compromiso inicial.<br>
                  <strong>Active Evaluation:</strong> Recuerda 3 días después (memoria activada), descarga la app, explora la variedad, evalúa opciones → activación del Sistema 2.<br>
                  <strong>Moment of Purchase:</strong> Casi falla por drip pricing (tarifa sorpresa → pain of paying → abandono). El descuento 20% actúa como ancla que reduce el dolor percibido y supera la barrera.<br>
                  <strong>Loyalty Loop:</strong> Crear un hábito (gatillo recurrente), ofrecer la primera compra con total transparente, y diseñar una recompensa inmediata post-compra. El descuento no garantiza lealtad.`
              },
              {
                id: "b",
                type: "choice",
                label: "Parte B — Decisión de Pricing (2 pts)",
                prompt: "El equipo de FreshRun evalúa 4 opciones para presentar el precio de su plan Pro (S/ 25/mes). ¿Cuál genera menor percepción de dolor de pago y mayor intención de compra? Elige y justifica con al menos 2 conceptos del curso.",
                options: [
                  { id: "op_a", text: "A) 'Plan Pro: S/ 25.00 al mes'" },
                  { id: "op_b", text: "B) 'Plan Pro: S/ 0.83 al día — menos que un café'" },
                  { id: "op_c", text: "C) 'Acceso ilimitado por el precio de 1 bowl al mes'" },
                  { id: "op_d", text: "D) 'Ahorra S/ 47 al mes vs. pedir sin plan. Costo: S/ 25'" }
                ],
                correct: "op_b",
                rubric: `<strong>Opción correcta: B</strong> — Usa el framing 'Penny-a-day' (fraccionamiento temporal), que reduce la percepción del monto total al compararlo con un gasto cotidiano trivial (un café).<br>
                  <strong>Conceptos a mencionar:</strong> Pain of paying reducido por fraccionamiento, anclaje (café como referencia), contabilidad mental (categoriza el gasto como pequeño/cotidiano).<br>
                  <strong>¿Por qué no las otras?</strong> A = neutro, no usa psicología. C = usa metáfora (bowl) pero no es un ancla tan universal como el café. D = usa aversión a la pérdida/ganancia, válida pero el framing temporal de B es más potente para montos mensuales.<br>
                  <em>Aceptar B o D con buena justificación. Penalizar A o C sin argumento conductual sólido.</em>`
              }
            ],
            explanation: "El CDJ de McKinsey mapea el viaje del consumidor desde el trigger hasta el loyalty loop. La fase crítica es el 'momento de compra', donde las barreras de fricción (como el drip pricing) generan mayor abandono.",
            session: "Sesiones 6, 7 y 10"
          }
        ]
      },
      // ── P6: Diseño A/B Test ──
      {
        id: "P6",
        title: "Diseño de Investigación Conductual (A/B Test)",
        points: 3,
        questions: [
          {
            id: "fr_p6",
            type: "multi_part",
            situation: `<strong>Pregunta 6 (3 pts)</strong><br>
              El equipo de FreshRun quiere reducir el abandono de carrito del 48% al 30%. 
              Sospechan que la tarifa de servicio mostrada solo al final del checkout es la principal causa.`,
            parts: [
              {
                id: "a",
                type: "free_text",
                label: "Hipótesis (Si... entonces...) — 1 pt",
                prompt: "Escribe la hipótesis del experimento en formato condicional: 'Si [intervención], entonces [resultado esperado medido en métrica concreta]'.",
                rubric: `<strong>Modelo:</strong> "Si mostramos el precio total (incluyendo tarifa de servicio) desde la pantalla del carrito antes del checkout, entonces la tasa de abandono en el step de pago bajará del 48% al menos a un 35% en los primeros 30 días."<br>
                  <em>Evaluación: debe tener SI + intervención específica + ENTONCES + métrica cuantificable. No aceptar hipótesis vagas.</em>`
              },
              {
                id: "b",
                type: "free_text",
                label: "Variable Independiente (VI) — 1 pt",
                prompt: "¿Cuál es la Variable Independiente del experimento? ¿Cómo se operacionaliza (qué cambia exactamente en el Grupo B vs. Grupo A/Control)?",
                rubric: `<strong>VI:</strong> La forma de presentar el precio total en el proceso de compra.<br>
                  <strong>Grupo A (control):</strong> Flujo actual → subtotal en carrito, tarifa de servicio aparece solo en el último paso del checkout.<br>
                  <strong>Grupo B (tratamiento):</strong> El total (subtotal + tarifa + envío) se muestra en la pantalla del carrito, antes de ingresar al checkout.<br>
                  <em>Evaluar que distinga claramente qué es diferente entre los grupos.</em>`
              },
              {
                id: "c",
                type: "free_text",
                label: "Variable Dependiente (VD) y Métricas de Control — 1 pt",
                prompt: "¿Cuál es la Variable Dependiente primaria? Menciona además 2 métricas de control que debas monitorear para asegurar que el experimento no distorsione otros KPIs del negocio.",
                rubric: `<strong>VD Principal:</strong> Tasa de conversión del checkout (o inversamente, tasa de abandono en el paso de pago).<br>
                  <strong>Métricas de control sugeridas:</strong><br>
                  1. Ticket promedio por pedido (asegurarse de que mostrar el total no reduzca el ticket).<br>
                  2. Tasa de retención al mes 2 (que la transparencia mejore o no perjudique la relación a largo plazo).<br>
                  3. NPS post-compra (que la experiencia percibida mejore).<br>
                  <em>Aceptar cualquier 2 métricas relevantes bien justificadas.</em>`
              }
            ],
            explanation: "Un A/B test conductual debe tener una VI claramente manipulable, una VD medible en comportamiento real (no declarado), y métricas de control para evitar efectos secundarios no deseados.",
            session: "Sesión 9"
          }
        ]
      }
    ]
  },

  // PRÁCTICA 2: URBANFIT
  {
    id: 2,
    caseName: "UrbanFit",
    caseSubtitle: "Suscripción de gimnasios boutique",
    caseShort: "App de membresía que da acceso a múltiples gimnasios boutique.",
    caseDescription: "UrbanFit ofrece acceso ilimitado a una red de gimnasios boutique con una sola membresía. El 55% cancela en el segundo mes alegando 'falta de tiempo', aunque la data muestra que el 80% que entrena en pareja retiene 4x más.",
    caseData: [
      "Churn al mes 2: 55%.",
      "Planes: Basic S/ 150, Elite S/ 199 (ilimitado), Elite Pro S/ 250 (ilimitado + extras).",
      "El plan Elite concentra el 77% de suscripciones.",
      "El 80% de usuarios que va en pareja retiene 4x más."
    ],
    sections: [
      {
        id: "P1", title: "Identificación de sesgos y heurísticas", points: 3,
        questions: [{
          id: "uf_p1", type: "drag_drop",
          situation: "<strong>Pregunta 1 (3 pts)</strong><br>Arrastra el concepto conductual correcto hacia cada situación de UrbanFit:",
          draggableItems: BIAS_POOL_URBANFIT,
          dropZones: [
            { id: "z1", label: "Al cancelar, la app muestra: 'Perderás tus 3 pases VIP acumulados y tu tarifa congelada'." },
            { id: "z2", label: "El plan Elite Pro (S/ 250) existe para que el Elite (S/ 199) parezca la mejor opción." },
            { id: "z3", label: "Clase de Cycling: 'Solo quedan 2 cupos'. El usuario reserva al instante." },
            { id: "z4", label: "La renovación mensual está activada por defecto. La mayoría no la cambia." },
            { id: "z5", label: "Al registrarse dicen que irán 5 veces/semana. La data muestra 1 vez/semana." },
            { id: "z6", label: "Tablero: 'Tus amigos entrenaron 3 veces más que tú esta semana'. El usuario reserva." }
          ],
          correct: { "z1": "u1", "z2": "u2", "z3": "u3", "z4": "u4", "z5": "u5", "z6": "u6" },
          explanation: "Perder pases = Aversión a la pérdida. Plan caro como ancla = Decoy. Cupos limitados = Escasez/FOMO. Renovación preactivada = Default. Promesa vs realidad = Brecha intención-acción. Comparación con pares = Prueba social.",
          session: "Sesiones 6, 7 y 8"
        }]
      },
      {
        id: "P2", title: "Sistema 1 / Sistema 2 y Bucle de Hábito", points: 3,
        questions: [{
          id: "uf_p2", type: "multi_part",
          situation: "<strong>Pregunta 2 (3 pts)</strong><br><em>Carlos, 32 años, abogado. Al inscribirse prometió ir cada mañana. Fue 4 veces el primer mes, luego dejó de ir. 'No tengo tiempo', dice. Pero usa 40 min en redes sociales antes de dormir. Los lunes ve a sus amigos publicar que están en Cycling y siente que debería ir.</em>",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — ¿Por qué no se formó el hábito? (2 pts)",
              prompt: "Explica por qué el hábito de Carlos NO se consolidó usando los 3 componentes del bucle de hábito. Luego explica la brecha intención-acción con los conceptos Sistema 1 / Sistema 2.",
              rubric: "<strong>Gatillo ausente:</strong> 'Cada mañana' es vago. Sin señal contextual específica el Sistema 1 no tiene ancla.<br><strong>Rutina con alta fricción:</strong> Ir al gym temprano requiere levantarse antes, preparar bolsa, trasladarse. El Sistema 1 elige el camino de menor resistencia.<br><strong>Recompensa demorada:</strong> Los beneficios del ejercicio son a largo plazo. Sin recompensa inmediata el cerebro no refuerza el bucle.<br><strong>Brecha intención-acción:</strong> Al planear usa Sistema 2 (optimista, sin fatiga). Al actuar en la mañana el Sistema 1 toma control y prefiere dormir más (estado frío vs. caliente)."
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Diseña la intervención (1 pt)",
              prompt: "Diseña UNA intervención conductual concreta que ayude a Carlos a formar el hábito. Usa al menos 2 herramientas conductuales del curso.",
              rubric: "<strong>Ejemplos válidos:</strong><br>1. Habit stacking: 'Reserva tu clase cada domingo a las 9pm, justo después de cenar.' → Gatillo existente ancla el nuevo comportamiento.<br>2. Pre-commitment con pérdida: Reservar con 48h de anticipación y activar costo de cancelación (S/ 15) → Aversión a la pérdida como refuerzo.<br>3. Recompensa inmediata: Al check-in en el gym, recibir puntos canjeables inmediatamente."
            }
          ],
          explanation: "La brecha intención-acción ocurre porque planeamos en frío (Sistema 2) pero actuamos en caliente (Sistema 1). Se necesitan gatillos específicos, baja fricción y recompensas inmediatas.",
          session: "Sesiones 2 y 5"
        }]
      },
      {
        id: "P3", title: "Pricing conductual y Framing", points: 4,
        questions: [{
          id: "uf_p3", type: "image_analysis",
          imageSrc: "assets/checkout-urbanfit.png",
          imageCaption: "Pantalla de suscripción de UrbanFit — analiza los elementos de diseño conductual.",
          situation: "<strong>Pregunta 3 (4 pts)</strong><br>Observa la pantalla de selección de plan. El equipo detectó abandono alto en este paso y confusión sobre cuál plan elegir.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Análisis de diseño conductual (2 pts)",
              prompt: "Identifica AL MENOS 3 técnicas de arquitectura de elección y pricing conductual presentes en la pantalla. Para cada una: ¿qué es y qué efecto busca?",
              rubric: "<strong>1. Efecto señuelo (Decoy):</strong> El Elite Pro (S/ 250) hace que el Elite (S/ 199) parezca el 'punto dulce'.<br><strong>2. Efecto default:</strong> El plan Elite viene preseleccionado.<br><strong>3. Escasez/Urgencia:</strong> Contador '02:34 restantes' activa FOMO y apaga el Sistema 2 analítico.<br><strong>4. Prominencia visual:</strong> Badge 'MÁS POPULAR' hace del Elite la opción saliente.<br><strong>5. Renovación automática preactivada:</strong> Default que aumenta el LTV del cliente."
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Ética del timer ficticio (2 pts)",
              prompt: "El timer '02:34 restantes para este precio' se reinicia cada vez que entras. ¿En qué punto un elemento de arquitectura de elección deja de ser nudge y se convierte en manipulación? Argumenta con ejemplos concretos de la pantalla.",
              rubric: "<strong>Línea ética:</strong> Un nudge es ético cuando es transparente y no usa información falsa.<br><strong>El timer ficticio cruza la línea:</strong> Usa información falsa (no hay escasez real) para generar urgencia artificial → manipulación por engaño.<br><strong>La renovación preactivada:</strong> Puede ser ética si es visible y fácil de desactivar. Se vuelve manipulación si está en letra pequeña.<br><strong>El Decoy:</strong> No engaña sobre hechos, solo estructura opciones → frontera ética aceptable."
            }
          ],
          explanation: "Los elementos de arquitectura de elección se vuelven manipuladores cuando usan información falsa o impiden una decisión verdaderamente informada.",
          session: "Sesiones 6, 7 y 8"
        }]
      },
      {
        id: "P4", title: "Arquitectura de elección y Nudges", points: 3,
        questions: [{
          id: "uf_p4", type: "multi_part",
          situation: "<strong>Pregunta 4 (3 pts)</strong><br>UrbanFit quiere reducir el churn del 55% al 30% en el segundo mes, sin modificar el precio ni ofrecer descuentos directos.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Diseño de intervenciones (2 pts)",
              prompt: "Diseña 2 nudges o intervenciones conductuales para reducir el churn. Para cada uno: descríbelo, indica qué herramienta conductual usa, y explica el mecanismo.",
              rubric: "<strong>Ejemplos válidos:</strong><br><strong>1. Pre-commitment con pérdida:</strong> 'Si vas 4 veces en el mes 1, te devolvemos S/ 30 el mes 2.' → Compromiso anticipado + Aversión a la pérdida del reembolso prometido.<br><strong>2. Pairing social:</strong> 'Invita a un amigo → ambos entrenan gratis 1 semana.' El dato de 4x retención en pareja valida el mecanismo social.<br><strong>3. Habit stacking semanal:</strong> Notificación dominical: 'Quedan 3 cupos en Cycling del miércoles. ¿Los reservamos?'"
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Selección y justificación (1 pt)",
              prompt: "¿Cuál de tus dos intervenciones tendría mayor impacto en la retención al mes 2? Justifica con datos del caso y conceptos del curso.",
              rubric: "No hay única respuesta correcta. Evaluar que use: (1) datos del caso, (2) concepto conductual nombrado correctamente, (3) coherencia entre intervención, mecanismo y resultado esperado."
            }
          ],
          explanation: "Las intervenciones más efectivas actúan en el momento de riesgo de abandono usando recompensas inmediatas o compromisos que aumenten el costo psicológico de cancelar.",
          session: "Sesiones 5 y 6"
        }]
      },
      {
        id: "P5", title: "Customer Decision Journey y Pricing", points: 4,
        questions: [{
          id: "uf_p5", type: "multi_part",
          situation: "<strong>Pregunta 5 (4 pts)</strong><br><em>Andrea, 27 años, quiere retomar el ejercicio. Un amigo le recomienda UrbanFit. Busca en Google, encuentra la app, elige el plan Elite (S/ 199). Al mes siguiente fue solo 2 veces. Está pagando S/ 199/mes por algo que casi no usa. Considera cancelar.</em>",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Mapeo CDJ de Andrea (2 pts)",
              prompt: "Mapea el Customer Decision Journey de Andrea:\n\n• TRIGGER: ¿Qué la mueve a buscar?\n• INITIAL CONSIDERATION: ¿Qué opciones considera?\n• ACTIVE EVALUATION: ¿Cómo decide?\n• MOMENT OF PURCHASE: ¿Qué ocurre en el pago?\n• POST-PURCHASE / LOYALTY LOOP: ¿Qué debe hacer UrbanFit para retenerla?",
              rubric: "<strong>Trigger:</strong> Recomendación del amigo (WOM) + deseo latente de ejercicio.<br><strong>Initial Consideration:</strong> Solo UrbanFit (referido directo).<br><strong>Active Evaluation:</strong> Búsqueda en Google, revisión de app, comparación de planes (Sistema 2 activo).<br><strong>Purchase:</strong> Elige Elite influenciada por Decoy (Elite Pro) y badge 'MÁS POPULAR'.<br><strong>Post-purchase:</strong> Brecha intención-acción. Necesita gatillo semanal, recompensa inmediata y menor fricción para reservar."
            },
            {
              id: "b", type: "choice",
              label: "Parte B — Framing para reactivación (2 pts)",
              prompt: "UrbanFit quiere enviar un mensaje a Andrea para que no cancele. ¿Cuál tiene mayor potencial conductual?",
              options: [
                { id: "op_a", text: "A) '¡Hola Andrea! Recuerda que tienes clases ilimitadas disponibles. ¡Úsalas!'" },
                { id: "op_b", text: "B) 'Andrea, llevas 18 días sin entrenar. Estás pagando S/ 6.63 por día que no usas. Reserva hoy y recupera lo tuyo.'" },
                { id: "op_c", text: "C) 'Renueva tu membresía y recibe un mes gratis si vas 4 veces en los próximos 14 días.'" },
                { id: "op_d", text: "D) 'Las clases de Yoga del jueves tienen cupos disponibles. ¿Las reservamos para ti?'" }
              ],
              correct: "op_b",
              rubric: "<strong>Opción B:</strong> Usa Aversión a la pérdida ('estás pagando S/ 6.63/día que no usas'), anclaje temporal (18 días concretos), framing de recuperación ('recupera lo tuyo'). Las demás no activan mecanismos psicológicos tan potentes."
            }
          ],
          explanation: "La brecha intención-acción ocurre después de la suscripción. Las intervenciones más efectivas activan la aversión a la pérdida del dinero ya pagado y reducen la fricción para retomar.",
          session: "Sesiones 5, 7 y 10"
        }]
      },
      {
        id: "P6", title: "Diseño de Investigación Conductual (A/B Test)", points: 3,
        questions: [{
          id: "uf_p6", type: "multi_part",
          situation: "<strong>Pregunta 6 (3 pts)</strong><br>UrbanFit quiere probar si mostrar el precio como 'S/ 6.63/día' en lugar de 'S/ 199/mes' aumenta la conversión en la pantalla de planes.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Hipótesis (1 pt)",
              prompt: "Escribe la hipótesis: 'Si [intervención específica], entonces [resultado medible]'.",
              rubric: "<strong>Modelo:</strong> 'Si mostramos el precio del plan Elite como S/ 6.63/día en lugar de S/ 199/mes, entonces la tasa de conversión a suscripción aumentará al menos 15% en los primeros 21 días.'"
            },
            {
              id: "b", type: "free_text",
              label: "VI y VD (1 pt)",
              prompt: "Define la Variable Independiente (qué cambia entre grupos) y la Variable Dependiente primaria (qué mides).",
              rubric: "<strong>VI:</strong> Formato de precio (mensual vs. diario). Grupo A: 'S/ 199/mes'. Grupo B: 'S/ 6.63/día'.<br><strong>VD:</strong> Tasa de conversión de la pantalla de planes."
            },
            {
              id: "c", type: "free_text",
              label: "Posibles sesgos (1 pt)",
              prompt: "Menciona 2 posibles sesgos o amenazas a la validez del experimento que el equipo debe controlar.",
              rubric: "<strong>Ejemplos válidos:</strong><br>1. Sesgo de selección: si los grupos son sistemáticamente diferentes la diferencia no se debe a la VI.<br>2. Período corto: resultados no representativos de variaciones estacionales.<br>3. Contaminación: usuario ve ambas versiones desde distintos dispositivos."
            }
          ],
          explanation: "La validez interna de un A/B test depende de la aleatorización correcta, período suficiente y control de variables externas.",
          session: "Sesión 9"
        }]
      }
    ]
  },


  // PRÁCTICA 3: PETAMIGO
  {
    id: 3,
    caseName: "PetAmigo",
    caseSubtitle: "Supermercado digital para mascotas",
    caseShort: "E-commerce de alimentos y accesorios para mascotas con entrega el mismo día.",
    caseDescription: "PetAmigo es una plataforma donde los dueños de mascotas compran alimentos, arena y medicamentos. El modelo de negocio depende de compras repetitivas frecuentes, pero los clientes suelen olvidarse de comprar a tiempo y terminan yendo a la veterinaria de la esquina pagando más. El reto: convertir compras ocasionales en hábito mensual.",
    caseData: [
      "Los usuarios visitan la app en promedio cada 28 días.",
      "Ticket promedio compra única: S/ 80. Ticket recurrente (Auto-Ship): S/ 150.",
      "La retención en Auto-Ship es baja: 40% cancela antes del tercer mes.",
      "Productos: Saco comida S/ 60 (pequeño), S/ 150 (premium), S/ 250 (gigante)."
    ],
    sections: [
      {
        id: "P1", title: "Identificación de sesgos y heurísticas", points: 3,
        questions: [{
          id: "pa_p1", type: "drag_drop",
          situation: "<strong>Pregunta 1 (3 pts)</strong><br>Arrastra el concepto conductual correcto hacia cada situación de PetAmigo:",
          draggableItems: BIAS_POOL_PETAMIGO,
          dropZones: [
            { id: "z1", label: "El saco premium (S/ 150) se coloca entre uno de S/ 60 y uno de S/ 250. Las ventas del S/ 150 suben." },
            { id: "z2", label: "'Ya te regalamos S/ 50 en tu monedero. Si cancelas Auto-Ship antes de 3 meses, los pierdes.'" },
            { id: "z3", label: "Etiqueta: 'El más comprado por dueños de Golden Retrievers'. Se vende 3x más rápido." },
            { id: "z4", label: "En el checkout, 'Donar S/ 2.00 a refugio de animales' viene marcado por defecto." },
            { id: "z5", label: "Al entrar a la app, un contador dice: 'Delivery gratis termina en 15:00 minutos'." },
            { id: "z6", label: "Un cliente rechaza una marca mejor al mismo precio: 'prefiero mantener la que ya conozco'." }
          ],
          correct: { "z1": "p1", "z2": "p2", "z3": "p3", "z4": "p4", "z5": "p5", "z6": "p6" },
          explanation: "Tres opciones empujan al medio = Aversión a extremos. S/ 50 ya entregado que se puede perder = Dotación+Pérdida. Compras de pares similares = Prueba social. Casilla premarcada = Default. Contador regresivo = Escasez/Urgencia. Rechazar lo nuevo conocido = Statu quo/Inercia.",
          session: "Sesiones 6, 7 y 8"
        }]
      },
      {
        id: "P2", title: "Sistema 1 / Sistema 2 y Bucle de Hábito", points: 3,
        questions: [{
          id: "pa_p2", type: "multi_part",
          situation: "<strong>Pregunta 2 (3 pts)</strong><br><em>Sandra, 35 años, tiene un Labrador llamado Tito. Compra comida para perros cuando se le acaba, a veces de urgencia en la veterinaria cercana pagando 30% más. Una vez recibió un medidor de comida (vasito) de PetAmigo con una línea marcada que decía 'Cuando la comida baje de aquí, pide en PetAmigo'. Desde entonces, pide 3–4 días antes de que se acabe.</em>",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Bucle de hábito de Sandra (2 pts)",
              prompt: "Antes del vasito, Sandra no tenía un hábito consolidado. Después del vasito, sí. Identifica los 3 componentes del nuevo bucle de hábito de Sandra explicando qué papel cumple el vasito en cada uno.",
              rubric: "<strong>Gatillo:</strong> Ver que la comida baja de la línea del vasito. El vasito convierte una señal ambiental abstracta ('se va a acabar') en un gatillo visual concreto y oportuno en el momento de acción (alimentar a Tito).<br><strong>Rutina:</strong> Abrir PetAmigo y hacer el pedido con anticipación. Es automatizado porque el gatillo es claro.<br><strong>Recompensa:</strong> Tranquilidad de no quedarse sin comida + ahorro vs. veterinaria + satisfacción de 'buena dueña'. La recompensa incluye la eliminación de la ansiedad de quedarse sin producto."
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Escala del vasito (1 pt)",
              prompt: "Si PetAmigo quiere escalar esta estrategia del vasito a todos sus clientes de Auto-Ship, ¿qué tipo de intervención conductual es y qué otros 2 objetos/mecanismos similares podrías diseñar para diferentes categorías de producto?",
              rubric: "<strong>Tipo de intervención:</strong> Gatillo ambiental (environmental cue) o señal contextual física. Es una forma de diseño conductual que hace visible una necesidad latente en el momento preciso de relevancia.<br><strong>Ejemplos alternativos:</strong><br>1. Arena para gatos: Una almohadilla de olor neutralizante que cambia de color cuando la arena necesita reposición → gatillo visual/olfativo.<br>2. Medicamento mensual: Un pastillero con secciones semanales; cuando queda la última semana, hay una nota adhesiva 'Pide tu recarga en PetAmigo' → gatillo temporal + físico."
            }
          ],
          explanation: "Los gatillos ambientales son las herramientas más poderosas para crear hábitos porque no dependen de la memoria ni de la motivación del usuario. El vasito convierte una señal invisible en una señal visual concreta.",
          session: "Sesiones 2 y 5"
        }]
      },
      {
        id: "P3", title: "Pricing conductual y Framing", points: 4,
        questions: [{
          id: "pa_p3", type: "image_analysis",
          imageSrc: "assets/checkout-petamigo.png",
          imageCaption: "Pantalla de checkout de PetAmigo — analiza los elementos de diseño conductual.",
          situation: "<strong>Pregunta 3 (4 pts)</strong><br>Observa la pantalla de checkout de PetAmigo. El equipo quiere entender qué elementos generan abandono y cuáles aumentan el ticket promedio.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Análisis de la pantalla (2 pts)",
              prompt: "Identifica AL MENOS 3 técnicas de pricing o arquitectura de elección que ves en la pantalla. Para cada una: nombre del concepto, cómo se aplica, y qué efecto busca en el comportamiento del usuario.",
              rubric: "<strong>1. Auto-Ship premarcado:</strong> Efecto default → inercia hace que la mayoría no lo desmarque. Convierte compra única en recurrente sin fricción.<br><strong>2. Donación premarcada:</strong> Efecto default + heurística de afecto (animales). Muchos donan sin haberlo decidido activamente.<br><strong>3. Envío sorpresa al final:</strong> Drip pricing / pain of paying aumentado. El costo de envío aparece solo en el último paso cuando ya hay compromiso cognitivo.<br><strong>4. Banner PetAmigo Plus:</strong> Efecto señuelo/upsell. El ahorro de S/ 15 ancla la membresía como 'gratis' si ya compras regularmente."
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Rediseño ético del checkout (2 pts)",
              prompt: "Propón 2 cambios concretos al checkout que mantengan los beneficios para el negocio pero que sean más transparentes y éticos para el consumidor. Justifica cada cambio con conceptos del curso.",
              rubric: "<strong>Cambios válidos:</strong><br>1. <strong>Mostrar el envío desde el carrito:</strong> Elimina el drip pricing. Reduce el pain of paying sorpresivo y aumenta la confianza. El precio total debe ser visible desde el inicio → mayor conversión a largo plazo y mejor NPS.<br>2. <strong>Cambiar la donación a opt-in con framing positivo:</strong> 'Únete a 12,000 dueños que ya donaron a refugios este mes.' → Mantiene el efecto de prueba social y apela al afecto sin usar el default de forma engañosa.<br>3. <strong>Auto-Ship con período de gracia visible:</strong> 'Te inscribimos en Auto-Ship con 30 días de prueba. Cancela fácilmente cuando quieras.' → Mantiene el beneficio del default pero con transparencia y facilidad de salida."
            }
          ],
          explanation: "El checkout es el momento de mayor dolor de pago. Cada elemento sorpresivo amplifica ese dolor. Los checkouts éticos muestran el costo total desde el inicio y hacen explícitas las opciones default.",
          session: "Sesiones 6, 7 y 8"
        }]
      },
      {
        id: "P4", title: "Arquitectura de elección y Nudges", points: 3,
        questions: [{
          id: "pa_p4", type: "multi_part",
          situation: "<strong>Pregunta 4 (3 pts)</strong><br>PetAmigo quiere aumentar la retención en Auto-Ship del 60% actual (que cancela al tercer mes) al 80%. No puede bajar el precio ni dar descuentos directos.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Diseño de nudges (2 pts)",
              prompt: "Diseña 2 nudges para aumentar la retención en Auto-Ship. Para cada uno: descríbelo en detalle, nómbralo con el concepto conductual que usa, y explica el mecanismo.",
              rubric: "<strong>Ejemplos válidos:</strong><br><strong>1. Efecto dotación progresivo:</strong> Cada mes en Auto-Ship el usuario acumula un 'Nivel de cuidador' (Bronce → Plata → Oro) con beneficios no monetarios (prioridad en delivery, acceso a contenido exclusivo de salud animal). Cancelar implica 'perder' el nivel acumulado → Aversión a la pérdida del estatus.<br><strong>2. Recompensa inmediata en entrega:</strong> Con cada entrega Auto-Ship, incluir una sorpresa pequeña (galleta para mascota, muestra de nuevo producto). La dopamina de la sorpresa refuerza la rutina → Refuerzo variable (como las máquinas tragamonedas, pero positivo).<br><strong>3. Mensaje de impacto:</strong> 'En 3 meses de Auto-Ship, Tito ha comido 18 comidas saludables y tú has ahorrado S/ 47 vs. comprar en urgencia.' → Hace visible el valor acumulado para activar el efecto dotación."
            },
            {
              id: "b", type: "free_text",
              label: "Parte B — Opt-in vs Opt-out (1 pt)",
              prompt: "El Auto-Ship actual es opt-out (viene activado por defecto). Un regulador de consumidores sugiere cambiarlo a opt-in (que el usuario elija activamente). ¿Qué impacto conductual tendría esto en el negocio y cómo podrías mitigarlo si te ves forzado a cambiar?",
              rubric: "<strong>Impacto del cambio a opt-in:</strong> La tasa de inscripción en Auto-Ship caería significativamente (estudios muestran caídas del 40–80% en programas similares) porque el esfuerzo de elegir activamente filtra a los usuarios menos comprometidos.<br><strong>Mitigación posible:</strong><br>1. Mantener opt-in pero con framing de ganancia muy visible: 'Con Auto-Ship ahorras S/ 47/mes y nunca te quedas sin comida para Tito. ¿Activar?' → La pregunta directa con beneficio claro aumenta conversión sin engañar.<br>2. Ofrecer incentivo de primera entrega solo para Auto-Ship (no descuento, sino regalo físico) → Hace tangible y atractivo el opt-in."
            }
          ],
          explanation: "El efecto dotación y las recompensas variables son los mecanismos más poderosos para retención. El opt-out es más efectivo pero debe ser transparente para ser ético.",
          session: "Sesiones 5 y 6"
        }]
      },
      {
        id: "P5", title: "Customer Decision Journey y Pricing", points: 4,
        questions: [{
          id: "pa_p5", type: "multi_part",
          situation: "<strong>Pregunta 5 (4 pts)</strong><br><em>Pedro, 40 años, tiene un gato llamado Mochi. Ve un video en TikTok de una veterinaria recomendando una marca de comida premium. Busca en Google, llega a PetAmigo, ve el saco premium S/ 150 entre uno de S/ 60 y uno de S/ 250, y compra el de S/ 150. Recibe un email de Auto-Ship que no abrió. Al mes siguiente, Mochi casi se queda sin comida y Pedro compra de urgencia en la bodega a S/ 190.</em>",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Parte A — Mapeo CDJ de Pedro (2 pts)",
              prompt: "Mapea el Customer Decision Journey de Pedro:\n\n• TRIGGER: ¿Qué dispara la necesidad?\n• INITIAL CONSIDERATION: ¿Qué opciones considera?\n• ACTIVE EVALUATION: ¿Cómo evalúa y decide?\n• MOMENT OF PURCHASE: ¿Qué ocurre en la compra?\n• POST-PURCHASE: ¿Qué falla y por qué no se forma el hábito?",
              rubric: "<strong>Trigger:</strong> Video en TikTok de veterinaria recomendando marca premium → necesidad latente activada por influencer de autoridad.<br><strong>Initial Consideration:</strong> Solo PetAmigo (búsqueda directa tras el video). Alternativa: veterinaria, bodega local.<br><strong>Active Evaluation:</strong> Llega a la página, ve 3 opciones de precio → Sistema 2 activo. Elige S/ 150 por aversión a los extremos (no lo más barato ni lo más caro).<br><strong>Moment of Purchase:</strong> Compra influenciada por arquitectura de precios (3 opciones). Email de Auto-Ship = oportunidad de retención no capitalizada.<br><strong>Post-purchase:</strong> No abre el email → no se inscribe en Auto-Ship → no forma el hábito → compra de urgencia en bodega. Falla: el gatillo de recompra no fue diseñado. El email es el formato menos efectivo para crear hábito."
            },
            {
              id: "b", type: "choice",
              label: "Parte B — Mejor estrategia de pricing para Auto-Ship (2 pts)",
              prompt: "PetAmigo evalúa cómo presentar el precio del Auto-Ship para maximizar la conversión. ¿Cuál de estas opciones funciona mejor conducalmente? Elige y justifica con al menos 2 conceptos.",
              options: [
                { id: "op_a", text: "A) 'Auto-Ship S/ 142.50/mes (5% de descuento)'" },
                { id: "op_b", text: "B) 'Con Auto-Ship, Mochi come bien por solo S/ 4.75/día. Sin Auto-Ship: S/ 6.33/día en urgencias'" },
                { id: "op_c", text: "C) 'Únete a 8,500 dueños de mascotas que ya usan Auto-Ship'" },
                { id: "op_d", text: "D) '¡Oferta limitada! Auto-Ship este mes con 10% OFF'" }
              ],
              correct: "op_b",
              rubric: "<strong>Opción B:</strong> Usa framing 'penny-a-day' (S/ 4.75/día vs S/ 6.33/día en urgencias) → reduce el dolor de pago por fraccionamiento temporal. Además usa encuadre de pérdida (lo que cuesta NO tener Auto-Ship es visible y concreto). Ancla la comparación contra el peor escenario (urgencia en bodega = gasto real del caso).<br><strong>Por qué no las otras:</strong> A = descuento simple, no usa psicología. C = prueba social válida pero no aborda el costo percibido. D = urgencia artificial + descuento, no sostenible y no construye valor."
            }
          ],
          explanation: "El framing de pérdida ('lo que te cuesta NO hacer X') es más poderoso que el framing de ganancia ('lo que ganas haciendo X') para superar la inercia de no suscribirse.",
          session: "Sesiones 7, 8 y 10"
        }]
      },
      {
        id: "P6", title: "Diseño de Investigación Conductual (A/B Test)", points: 3,
        questions: [{
          id: "pa_p6", type: "multi_part",
          situation: "<strong>Pregunta 6 (3 pts)</strong><br>PetAmigo quiere reducir las compras de urgencia (donde el cliente pierde y la bodega gana). Hipotetizan que enviar una notificación push 5 días antes de que se acabe la comida (basado en datos de consumo) aumentará las recompras anticipadas.",
          parts: [
            {
              id: "a", type: "free_text",
              label: "Hipótesis (1 pt)",
              prompt: "Escribe la hipótesis completa del experimento: 'Si [intervención], entonces [resultado medible en métrica concreta]'.",
              rubric: "<strong>Modelo:</strong> 'Si enviamos una notificación push personalizada 5 días antes del agotamiento estimado ('Tito necesitará comida en 5 días. ¿Pedimos hoy y ahorras el envío?'), entonces la tasa de recompra anticipada aumentará del X% actual al Y% en los primeros 60 días de prueba, y las compras de urgencia disminuirán en al menos 20%.'"
            },
            {
              id: "b", type: "free_text",
              label: "VI, VD y Grupo de Control (1 pt)",
              prompt: "Define: (1) Variable Independiente y cómo se operacionaliza en Grupo A vs. Grupo B. (2) Variable Dependiente primaria. (3) ¿Qué caracteriza al Grupo Control?",
              rubric: "<strong>VI:</strong> Recibir o no la notificación push anticipada. Grupo A (control): no recibe notificación proactiva (flujo actual). Grupo B (tratamiento): recibe push personalizado 5 días antes del agotamiento estimado.<br><strong>VD Principal:</strong> Tasa de recompra antes de agotamiento (%) o número de días de anticipación promedio con que se hace el pedido.<br><strong>Grupo Control:</strong> Usuarios sin la notificación, manteniendo todas las demás condiciones iguales (mismo tipo de producto, misma frecuencia histórica, mismos canales de comunicación excepto el push)."
            },
            {
              id: "c", type: "free_text",
              label: "Implicaciones éticas y de privacidad (1 pt)",
              prompt: "Este experimento usa datos de consumo del usuario (cuándo se acaba la comida de su mascota) para enviar notificaciones personalizadas. Menciona 2 consideraciones éticas o de privacidad que el equipo debe contemplar.",
              rubric: "<strong>Consideraciones válidas:</strong><br>1. <strong>Consentimiento informado:</strong> El usuario debe haber aceptado explícitamente que PetAmigo use sus datos de consumo para notificaciones predictivas. No basta con los T&C genéricos.<br>2. <strong>Transparencia del algoritmo:</strong> La notificación debe decir claramente que está basada en su historial de pedidos, no parecer mágica o invasiva ('sabemos cuándo se te acaba la comida').<br>3. <strong>Opt-out fácil:</strong> El usuario debe poder desactivar estas notificaciones sin consecuencias en el servicio.<br>4. <strong>Sesgo en el experimento:</strong> Los usuarios del Grupo B saben que los están observando (si ven la notificación) → posible cambio de comportamiento no relacionado con la notificación."
            }
          ],
          explanation: "Los experimentos conductuales con datos personales requieren equilibrar la efectividad de la intervención con la privacidad y el consentimiento. Un nudge ético informa al usuario sobre cómo se usa su información.",
          session: "Sesión 9"
        }]
      }
    ]
  }
];

