module.exports = {
  // 1xx: Informational информационные
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102, // «идёт обработка»

  // 2xx: Success успешно
  OK: 200, // «хорошо»
  PARTIAL_CONTENT: 206, // «частичное содержимое»
  MULTI_STATUS: 207, // «многостатусный»
  ALREADY_REPORTED: 208, // «уже сообщалось»
  IM_USED: 226, // «использовано IM»

  // 3xx: Redirection перенаправление
  MULTIPLE_CHOICES: 300, // «множество выборов»
  MOVED_PERMANENTLY: 301, // «перемещено навсегда»
  MOVED_TEMPORARILY: 302, // «перемещено временно»
  FOUND: 302, // «найдено»
  SEE_OTHER: 303, // «смотреть другое»
  NOT_MODIFIED: 304, // «не изменялось»
  USE_PROXY: 305, // «использовать прокси»
  // 306 — зарезервировано код использовался только в ранних спецификациях
  TEMPORARY_REDIRECT: 307, // «временное перенаправление»
  PERMANENT_REDIRECT: 308, // «постоянное перенаправление»

  // 4xx: Client Error ошибка клиента
  BAD_REQUEST: 400, // «плохой, неверный запрос»
  UNAUTHORIZED: 401, // «не авторизован не представился
  PAYMENT_REQUIRED: 402, // «необходима оплата»
  FORBIDDEN: 403, // «запрещено не уполномочен
  NOT_FOUND: 404, // «не найдено»
  METHOD_NOT_ALLOWED: 405, // «метод не поддерживается»
  NOT_ACCEPTABLE: 406, // «неприемлемо»
  PROXY_AUTHENTICATION_REQUIRED: 407, // «необходима аутентификация прокси»
  REQUEST_TIMEOUT: 408, // «истекло время ожидания»
  CONFLICT: 409, // «конфликт»
  GONE: 410, // «удалён»
  LENGTH_REQUIRED: 411, // «необходима длина»
  PRECONDITION_FAILED: 412, // «условие ложно»
  PAYLOAD_TOO_LARGE: 413, // «полезная нагрузка слишком велика»
  URI_TOO_LONG: 414, // «URI слишком длинный»
  UNSUPPORTED_MEDIA_TYPE: 415, // «неподдерживаемый тип данных»
  RANGE_NOT_SATISFIABLE: 416, // «диапазон не достижим»
  EXPECTATION_FAILED: 417, // «ожидание не удалось»
  I_AM_A_TEAPOT: 418, // «я — чайник»
  MISDIRECTED_REQUES: 421,
  UNPROCESSABLE_ENTITY: 422, // «необрабатываемый экземпляр»
  LOCKED: 423, // «заблокировано»
  FAILED_DEPENDENCY: 424, // «невыполненная зависимость»
  UPGRADE_REQUIRED: 426, // «необходимо обновление»
  PRECONDITION_REQUIRED: 428, // «необходимо предусловие»
  TOO_MANY_REQUESTS: 429, // «слишком много запросов»
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // «поля заголовка запроса слишком большие»
  RETRY_WITH: 449, // «повторить с»
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // «недоступно по юридическим причинам»

  // 5xx: Server Error ошибка сервера
  INTERNAL_SERVER_ERROR: 500, // «внутренняя ошибка сервера»
  NOT_IMPLEMENTED: 501, // «не реализовано»
  BAD_GATEWAY: 502, // «плохой, ошибочный шлюз»
  SERVICE_UNAVAILABLE: 503, // «сервис недоступен»
  GATEWAY_TIMEOUT: 504, // «шлюз не отвечает»
  HTTP_VERSION_NOT_SUPPORTED: 505, // «версия HTTP не поддерживается»
  VARIANT_ALSO_NEGOTIATES: 506, // «вариант тоже проводит согласование»
  INSUFFICIENT_STORAGE: 507, // «переполнение хранилища»
  LOOP_DETECTED: 508, // «обнаружено бесконечное перенаправление»
  BANDWIDTH_LIMIT_EXCEEDED: 509, // «исчерпана пропускная ширина канала»
  NOT_EXTENDED: 510, // «не расширено»
  NETWORK_AUTHENTICATION_REQUIRED: 511, // «требуется сетевая аутентификация»
  UNKNOWN_ERROR: 520, // «неизвестная ошибка»
  WEB_SERVER_IS_DOWN: 521, // «веб-сервер не работает»
  CONNECTION_TIMED_OUT: 522, // «соединение не отвечает»
  ORIGIN_IS_UNREACHABLE: 523, // «источник недоступен»
  A_TIMEOUT_OCCURRED: 524, // «время ожидания истекло»
  SSL_HANDSHAKE_FAILED: 525, // «квитирование SSL не удалось»
  INVALID_SSL_CERTIFICATE: 526, // «недействительный сертификат SSL»
};
